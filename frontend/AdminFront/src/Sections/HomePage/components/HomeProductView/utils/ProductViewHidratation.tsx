
export function swapMainImage(container: HTMLElement, thumb: HTMLImageElement) {
    const mainImg = container.querySelector<HTMLImageElement>(".main-product-image");
    if (mainImg) mainImg.src = thumb.src;
}

export function handleAddToCart(btn: HTMLButtonElement, addProductToCart: Function) {
    const id = btn.dataset.productId!;
    addProductToCart(id, 1);
}

export function handleBuyWhatsApp(btn: HTMLButtonElement, handleGoToWhatsapp: Function) {
    const id = btn.dataset.productId!;
    handleGoToWhatsapp(id);
}
