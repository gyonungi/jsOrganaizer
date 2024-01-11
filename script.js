const prevBtn = document.getElementById('prevBtn')
const nextBtn = document.getElementById('nextBtn')
const monthYear = document.getElementById('monthYear')
const datesContainer = document.getElementById('dates')
const addBtn = document.getElementById('addBtn')
const searchInp = document.getElementById('searchInp')
const daysOfWeek = [
	'Понедельник ',
	'Вторник ',
	'Среда ',
	'Четверг ',
	'Пятница ',
	'Суббота ',
	'Воскресенье ',
]

let currentDate = new Date()
let currentMonth = currentDate.getMonth()
let currentYear = currentDate.getFullYear()

function updateCalendar() {
	const firstDayOfMonth = new Date(currentYear, currentMonth, 1)
	const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0)
	const daysInMonth = lastDayOfMonth.getDate()

	const monthName = firstDayOfMonth.toLocaleString('default', { month: 'long' })
	monthYear.textContent = `${
		monthName.charAt(0).toUpperCase() + monthName.slice(1)
	} ${currentYear}`

	let dayIndex = daysOfWeek.indexOf(
		firstDayOfMonth.toLocaleString('default', { weekday: 'short' })
	)

	datesContainer.innerHTML = ''

	for (let day = 1; day <= daysInMonth + dayIndex; day++) {
		const dateElement = document.createElement('div')
		dateElement.classList.add('date')

		if (day <= daysOfWeek.length && day > dayIndex) {
			const dayOfWeekElement = document.createElement('div')
			dayOfWeekElement.classList.add('date', 'day__week')
			dayOfWeekElement.textContent = daysOfWeek[day - 1] + ','

			dateElement.appendChild(dayOfWeekElement)
		}

		if (day > dayIndex) {
			dateElement.dataset.date = `${currentYear}-${currentMonth + 1}-${
				day - dayIndex
			}`
			dateElement.innerHTML += `${day - dayIndex}`
		}

		datesContainer.appendChild(dateElement)
	}
}
function searchCalendar() {
	const searchText = searchInp.value.toLowerCase()
	const allDateElements = document.querySelectorAll('.date')

	allDateElements.forEach(dateElement => {
		const dayContent = dateElement.querySelector('.editable')
		const dateText = dateElement.dataset.date || ''
		const contentText = dayContent ? dayContent.textContent.toLowerCase() : ''

		if (dateText.includes(searchText) || contentText.includes(searchText)) {
			dateElement.classList.add('highlight')
		} else {
			dateElement.classList.remove('highlight')
		}
	})
}
function selectDate(dateElement) {
	const text = prompt('Введите текст события:')
	if (text) {
		dateElement.classList.add('date__gray')
		const dayContent = dateElement.querySelector('.editable')

		if (dayContent) {
			dayContent.textContent = text
		} else {
			const editableElement = document.createElement('div')
			editableElement.classList.add('editable')
			dateElement.appendChild(editableElement)
			editableElement.textContent = text
		}
	}
}
searchInp.addEventListener('input', searchCalendar)

prevBtn.addEventListener('click', () => {
	currentMonth--
	if (currentMonth < 0) {
		currentMonth = 11
		currentYear--
	}
	updateCalendar()
})

nextBtn.addEventListener('click', () => {
	currentMonth++
	if (currentMonth > 11) {
		currentMonth = 0
		currentYear++
	}
	updateCalendar()
})

addBtn.addEventListener('click', () => {
	const selectedDate = document.querySelector('.selected')
	if (selectedDate) {
		selectDate(selectedDate)
	}
})

datesContainer.addEventListener('click', event => {
	const dateElement = event.target.closest('.date')
	if (dateElement) {
		selectDate(dateElement)
	}
})

updateCalendar()
