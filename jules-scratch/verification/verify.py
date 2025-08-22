from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()
    page.goto("http://localhost:3000")

    # Find the "Read the Docs" card and hover over it
    card = page.locator("div.group:has-text('Read the Docs')")
    card.hover()

    # Wait for the animation to start
    page.wait_for_timeout(1000)

    page.screenshot(path="jules-scratch/verification/verification.png")
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
