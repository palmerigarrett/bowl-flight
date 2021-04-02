const { Builder, By, Key, until } = require('selenium-webdriver')
require('selenium-webdriver/chrome')
require('selenium-webdriver/firefox')
require('chromedriver')
require('geckodriver')

const rootURL = 'http://localhost:3000/'
const d = new Builder().forBrowser('chrome').build()
const waitUntilTime = 20000
let driver, strike, actual, expected
// jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 60 * 5

async function getElementById(id) {
  const strike = await driver.wait(until.elementLocated(By.css(id)), waitUntilTime)
  return await driver.wait(until.elementIsVisible(strike), waitUntilTime)
}

it('waits for the driver to start', () => {
  return d.then(_d => {
    driver = _d
  })
})
it('initialises the context', async () => {
  await driver.manage().window().setPosition(0, 0)
  await driver.manage().window().setSize(1280, 1024)
  await driver.get(rootURL)
})

it('should click on the option "Strike" and then the submit button to add strike to frame', async () => {
  strike = await getElementById('#roll > option:nth-child(2)')
  strike.click()
  strike = await getElementById('#submitRoll')
  strike.click()
  strike = await getElementById('#outcome')
  strike.click()

  actual = await strike.getText()
  expected = 'X'
  expect(actual).toEqual(expected)
})
