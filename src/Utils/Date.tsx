export function getCurrentMonth() {
    const date = new Date()

    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
}

export function formatMonth(month: string) {
  const [year, m] = month.split("-").map(Number)

  const date = new Date(year, m - 1, 1)

  return date.toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  })
}

export function changeMonth(month: string, offset: number) {
  const [year, m] = month.split("-").map(Number)

  const date = new Date(year, m - 1, 1)

  date.setMonth(date.getMonth() + offset)

  const newYear = date.getFullYear()
  const newMonth = String(date.getMonth() + 1).padStart(2, "0")

  return `${newYear}-${newMonth}`
}

export function getToday() {
    const today = new Date()

    return today.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit"
    })
}

export function isCurrentMonth(month: string) {
  const today = new Date()

  const currentYear = today.getFullYear()
  const currentMonth = today.getMonth() + 1

  const [year, m] = month.split("-").map(Number)

  return year === currentYear && m === currentMonth
}
