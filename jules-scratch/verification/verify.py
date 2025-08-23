from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:3000")

        # Hover over the first card
        card = page.locator('.grid > li').first
        card.hover()

        # Wait for the effect to be visible
        page.wait_for_timeout(1000)

        page.screenshot(path="jules-scratch/verification/verification.png")
        browser.close()

run()
