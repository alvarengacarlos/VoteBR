class BirthDate {
    
	constructor(year, month, day) {
		this.year = year;
		this.month = month;
		this.day = day;
	}

	static makeBirthDate(year, month, day) {
		return new BirthDate(year, month, day);
	}

	getAge() {
		const year = new Date().getFullYear();
		const month = new Date().getMonth();
		const day = new Date().getDay();
		
		const toDay = new Date(`${year}-${month}-${day}`);
		const birthDate = new Date(`${this.year}-${this.month}-${this.day}`);
		
		const age =  (toDay.getFullYear() - birthDate.getFullYear());		

		return age;
	}	
}

module.exports = BirthDate;