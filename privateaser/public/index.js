'use strict';

//list of bats
//useful for ALL 5 steps
//could be an array of objects that you fetched from api or database
const bars = [{
  'id': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'name': 'freemousse-bar',
  'pricePerHour': 50,
  'pricePerPerson': 20
}, {
  'id': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'name': 'solera',
  'pricePerHour': 100,
  'pricePerPerson': 40
}, {
  'id': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'name': 'la-poudriere',
  'pricePerHour': 250,
  'pricePerPerson': 80
}];

//list of current booking events
//useful for ALL steps
//the time is hour
//The `price` is updated from step 1 and 2
//The `commission` is updated from step 3
//The `options` is useful from step 4
const events = [{
  'id': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'booker': 'esilv-bde',
  'barId': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'time': 4,
  'persons': 8,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }
}, {
  'id': '65203b0a-a864-4dea-81e2-e389515752a8',
  'booker': 'societe-generale',
  'barId': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'time': 8,
  'persons': 30,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }
}, {
  'id': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'booker': 'otacos',
  'barId': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'time': 5,
  'persons': 80,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }
}];

//list of actors for payment
//useful from step 5
const actors = [{
  'eventId': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'eventId': '65203b0a-a864-4dea-81e2-e389515752a8',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'eventId': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}];


function bookingPrice(){
    for (var i = 0 ; i < 3 ; i++){
		var j = 0;
		
		while(bars[j].id !== events[i].barId){
			j++;}
			
		var timeComponent = events[i].time * bars[j].pricePerHour;
		var personComponent = events[i].persons * bars[j].pricePerPerson;
		var bookingPrice = timeComponent + personComponent;
		events[i].price = bookingPrice;

        console.log(events[i]);
    }
}



function decreasingPricing(){
    for (var i = 0 ; i < 3 ; i++){
		var j = 0;
		
		while(bars[j].id !== events[i].barId){
			j++;}
			
		var timeComponent = events[i].time * bars[j].pricePerHour;
		var personComponent = events[i].persons * bars[j].pricePerPerson;
		var bookingPrice = timeComponent + personComponent;

		if (events[i].persons > 60){
			bookingPrice = bookingPrice*50/100;}		//50% decreasing
		else{
			if (events[i].persons > 20){
				bookingPrice = bookingPrice*70/100;}	//30% decreasing
			else{
				if (events[i].persons > 10){
					bookingPrice = bookingPrice*90/100}	//10% decreasing
        	}
        }

		events[i].price = bookingPrice;    

        console.log(events[i]);
    }
}



function commission(){
    for (var i = 0 ; i < 3 ; i++){
		var j = 0;
		
		while(bars[j].id !== events[i].barId){
			j++;}
			
		var timeComponent = events[i].time * bars[j].pricePerHour;
		var personComponent = events[i].persons * bars[j].pricePerPerson;
		var bookingPrice = timeComponent + personComponent;

		if (events[i].persons > 60){
			bookingPrice = bookingPrice*50/100;}		//50% decreasing
		else{
			if (events[i].persons > 20){
				bookingPrice = bookingPrice*70/100;}	//30% decreasing
			else{
				if (events[i].persons > 10){
					bookingPrice = bookingPrice*90/100}	//10% decreasing
        	}
        }
    	
		var commission = bookingPrice*30/100;
		var insurance = commission/2;
		var treasury = events[i].persons;
		var privateaser = commission - insurance - treasury;

		events[i].price = bookingPrice;
		events[i].commission.insurance = insurance;
		events[i].commission.treasury = treasury;
		events[i].commission.privateaser = privateaser;

        console.log(events[i])
    }
}



function deductible(){
    for (var i = 0 ; i < 3 ; i++){
		var j = 0;
		
		while(bars[j].id !== events[i].barId){
			j++;}
			
		var timeComponent = events[i].time * bars[j].pricePerHour;
		var personComponent = events[i].persons * bars[j].pricePerPerson;
		var bookingPrice = timeComponent + personComponent;

		if (events[i].persons > 60){
			bookingPrice = bookingPrice*50/100;}		//50% decreasing
		else{
			if (events[i].persons > 20){
				bookingPrice = bookingPrice*70/100;}	//30% decreasing
			else{
				if (events[i].persons > 10){
					bookingPrice = bookingPrice*90/100}	//10% decreasing
        	}
        }
    	
		var commission = bookingPrice*30/100;
		var insurance = commission/2;
		var treasury = events[i].persons;
		var privateaser = commission - insurance - treasury;

		var deductible;

		if (events[i].options.deductibleReduction){
			deductible = events[i].persons;
			bookingPrice += deductible;
			privateaser += deductible;}

		events[i].price = bookingPrice;
		events[i].commission.insurance = insurance;
		events[i].commission.treasury = treasury;
		events[i].commission.privateaser = privateaser;

        console.log(events[i])
	}
}



function payTheActors(){
    for (var i = 0 ; i < 3 ; i++){
		var j = 0;
		
		while(bars[j].id !== events[i].barId){
			j++;}
			
		var timeComponent = events[i].time * bars[j].pricePerHour;
		var personComponent = events[i].persons * bars[j].pricePerPerson;
		var bookingPrice = timeComponent + personComponent;

		if (events[i].persons > 60){
			bookingPrice = bookingPrice*50/100;}		//50% decreasing
		else{
			if (events[i].persons > 20){
				bookingPrice = bookingPrice*70/100;}	//30% decreasing
			else{
				if (events[i].persons > 10){
					bookingPrice = bookingPrice*90/100}	//10% decreasing
        	}
        }
    	
		var commission = bookingPrice*30/100;
		var insurance = commission/2;
		var treasury = events[i].persons;
		var privateaser = commission - insurance - treasury;

		var deductible;

		if (events[i].options.deductibleReduction){
			deductible = events[i].persons;
			bookingPrice += deductible;
			privateaser += deductible;}

		events[i].price = bookingPrice;
		events[i].commission.insurance = insurance;
		events[i].commission.treasury = treasury;
		events[i].commission.privateaser = privateaser;

		actors[i].payment[0].amount -= bookingPrice;				//booker
		actors[i].payment[1].amount += bookingPrice - commission;	//bar
		actors[i].payment[2].amount += insurance;					//insurance
		actors[i].payment[3].amount += treasury;					//treasury
		actors[i].payment[4].amount += privateaser;					//privateaser

        console.log(actors[i]);
	}
}
payTheActors()	
