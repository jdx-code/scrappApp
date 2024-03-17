const fs = require('fs')
const puppeteer = require('puppeteer')

async function run() {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('https://www.traversymedia.com') 

    // Create a screenshot (default size)
    // await page.screenshot({ path: 'example.png' })

    // Create a screenshot (fullsize)
    // await page.screenshot({ path: 'example-2.png', fullPage: true })

    // Create a pdf
    // await page.pdf({ path: 'example.pdf', format: 'A4' })

    // Get the html for a page
    // const html = await page.content()
    // console.log(html)

    // Get the title of the page
    // const title = await page.evaluate(() => document.title)
    // console.log(title)

    // Get all the texts of the page
    // const allTexts = await page.evaluate(() => document.body.innerText)
    // console.log(allTexts)

    // Get all links (urls) from <a> tags of the page
    // const links = await page.evaluate(() => Array.from(document.querySelectorAll('a'), (e) => e.href))
    // console.log(links)

    // Get all courses
    // const courses = await page.evaluate(() => Array.from(document.querySelectorAll('#cscourses .card'), (e) => ({
    //     title: e.querySelector('.card-body h3').innerHTML,
    //     level: e.querySelector('.card-body .level').innerHTML,
    //     url: e.querySelector('.card-footer a').href,
    //     // promo: e.querySelector('.card-footer .promo-code .promo').innerHTML
    // })))
    // console.log(courses)

    // Get all courses (without using Array.from && document.querySelector)
    const courses = await page.$$eval('#cscourses .card', (elements) => elements.map(e => ({
        title: e.querySelector('.card-body h3').innerHTML,
        level: e.querySelector('.card-body .level').innerHTML,
        url: e.querySelector('.card-footer a').href,
    })))
    console.log(courses)

    // Save data to JSON file
    fs.writeFile('courses.json', JSON.stringify(courses), (err) => {
        if(err) throw err
        console.log('File saved')
    })


    await browser.close()
}

run()