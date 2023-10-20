export function setCurrency(price) {
  return price.toLocaleString("ko-KR", {
    style: "currency",
    currency: "KRW",
  });
}
