const seniorInternational = []

seniorInternational[0] = {
	Plaats: 1,
	Atleet: "Gatlin",
	Tijd: "9,8", //"9.8" --> parseInt("9.8") --> 9.8
	Verschil_tov_nr_3: "-0,04",
	Percentage_TOV_nr_3: "-.041%"
}

console.log(result[0][0]) //"Mannen"
let gender = result[0][0].split(';')[0]
console.log(gender)

[ 'Categorie;;Atleet;Tijd;Verschil tov nr 3 ;% TOV nr 3' ],

let properties = result[0][1].split(';')
properties[1] = "Plaats"
properties[5] = properties[5].replace('%', 'percentage')

[ 'Senioren Internationaal;1;Gatlin;9,8;-0,04;-0,41%' ],

let seniorInternational = result[0][2].split(';')

athletePerformances = []

let athletePerformances[0] = {
	properties[1]: seniorInternational[1],
	properties[2]: seniorInternational[2],
	properties[3]: parseFloat(seniorInternational[3].replace(',', '.')),
	properties[4]: seniorInternational[4]
}

