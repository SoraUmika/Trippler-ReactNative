export default interface Filter {
    status: "all" | "close" | "open",
    rating: "all" | [number, number],
    ratingNum: "all" | [number, number]
}