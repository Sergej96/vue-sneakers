export function formatPrice(price: number) {
    return price.toLocaleString('RUB', {
        minimumFractionDigits: 0,
        style: 'currency',
        currency: 'RUB'
    })
}
