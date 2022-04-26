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
		
		const YEARS_IN_MILISECUNDS = 0.00000000003171;

		const toDay = new Date(`${year}-${month}-${day}`);
		const birthDate = new Date(`${this.year}-${this.month}-${this.day}`);
		
		const age =  Number.parseInt((toDay - birthDate) * YEARS_IN_MILISECUNDS);		

		return age;
	}	
}

module.exports = BirthDate;