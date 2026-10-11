import {expect, type Page, type Locator} from '@playwright/test';
import {BasePage} from './BasePage';

export class InventoryPage extends BasePage {

    readonly path = '/inventory.html';
    protected readonly pageAnchor: Locator;
    private readonly firstProductItem: Locator;
    private readonly cartBadge: Locator;
    private readonly cartLink: Locator;
    private readonly menuButton: Locator;
    private readonly logoutLink: Locator;

    constructor(page: Page) {
        super(page);

        this.pageAnchor = page.getByTestId('inventory-list');
        this.firstProductItem = page.getByTestId('inventory-item').first();
        this.cartBadge = page.getByTestId('shopping-cart-badge');
        this.cartLink = page.getByTestId('shopping-cart-link');
        this.menuButton = page.getByRole('button', {name: 'Open Menu', exact: true});
        this.logoutLink = page.getByTestId('logout-sidebar-link');
    }

    // Select the first product and keep its details for cart and checkout checks.
    async addFirstAvailableProductToCart(): Promise<{ name: string; price: string }> {

        const name = await this.firstProductItem.getByTestId('inventory-item-name').innerText();
        const price = await this.firstProductItem.getByTestId('inventory-item-price').innerText();

        await this.firstProductItem.getByRole('button', {name: 'Add to cart', exact: true}).click();
        return {name, price};
    }


    async expectCartItemCount(expectedCount: number): Promise<void> {
        // The badge is removed when the cart is empty.
        if (expectedCount === 0) {
            await expect(this.cartBadge).toHaveCount(0);
        } else {
            await expect(this.cartBadge).toHaveText(String(expectedCount));
        }
    }

    async openCart(): Promise<void> {
        await this.cartLink.click();
    }

    async openMenu(): Promise<void> {
        await this.menuButton.click();
        await expect(this.logoutLink).toBeVisible();
    }

    async logout(): Promise<void> {
        await this.logoutLink.click();
    }
}
