var results = {
	// universal access
   "increased_preventative_medicine":{  
      "name":"Increased Preventative Medicine",
      "description":"",
      "category":"universal_access"
   },
   "healthier_people":{  
      "name":"More Health Conscious People",
      "description":"",
      "category":"universal_access"
   },
   "increased_efficiency":{  
      "name":"Increased Efficiency",
      "description":"",
      "category":"universal_access"
   },

   // near perfect quality
   "reduced_errors":{  
      "name":"Reduced Errors",
      "description":"",
      "category":"near_perfect_quality"
   },   
   "more_equitable":{  
      "name":"More Equitable",
      "description":"",
      "category":"near_perfect_quality"
   },
   "better_care":{  
      "name":"Better Care",
      "description":"",
      "category":"near_perfect_quality"
   },

   // much better prices
   "fewer_hospital_visits":{  
      "name":"Fewer Hospital Visits",
      "description":"",
      "category":"much_better_prices"
   },
   "better_prices":{  
      "name":"Better Costs",
      "description":"",
      "category":"better_prices"
   },
    "fewer_unnecessary_tests":{  
      "name":"Fewer Unnecessary Tests",
      "description":"",
      "category":"better_prices"
   }
};

var behaviors = {
	// universal access
	"private_options":{
		"name":"Private Options Available",
		"results_impacted":[],
		"pov":"patient"
	},
	"everyone_gets_covered":{
		"name":"Everyone Gets Covered",
		"results_impacted":["better_prices","more_equitable","increased_preventative_medicine"],
		"pov":"patient"
	},
	"pt_take_charge":{
		"name":"Patients Can Take Charge of Their Own Health",
		"results_impacted":["more_equitable","healthier_people"]
	},
	"self_care":{
		"name":"Self Care",
		"results_impacted":["better_prices", "increased_preventative_medicine"],
		"pov":"patient"
	},
	"primary_care":{
		"name":"Primary Caregivers Spend More Time with Patients, Collectively Offer More Appointments",
		"results_impacted":["better_care", "more_equitable"],
		"pov":"patient"
	},
	"improve_interoperability":{
		"name":"Improve Interoperability",
		"results_impacted":["better_care","fewer_unnecessary_tests","reduced_errors","increased_efficiency"],
		"pov":"clinician"
	},

	// near perfect quality
	"people_shop":{
		"name":"People Shop for Quality and Cost",
		"results_impacted":["better_prices", "better_care"],
		"pov":"patient"
	},
	"people_value_life":{
		"name":"People Value Quality of Life",
		"results_impacted":["better_care"],
		"pov":"patient"
	},
	"clinicians_communicate":{
		"name":"Clinicians Communicate Better with Patients",
		"results_impacted":["fewer_unnecessary_tests","fewer_hospital_visits","better_care","reduced_errors"],
		"pov":"clinician"
	},
	"tailored_treatment_plans":{
		"name":"Tailored Treatment Plans",
		"results_impacted":["fewer_unnecessary_tests", "better_care"],
		"pov":"clinician"
	},

	// much better prices
	"clinicians_bill":{
		"name":"Fees for Outcomes Instead of Fees for Services",
		"results_impacted":["better_prices", "fewer_unnecessary_tests","increased_efficiency"],
		"pov":"clinician"
	},
	"clinicians_are_not_penalized_by_law":{
		"name":"Clinicians Don't Have to Cover Their Butts",
		"results_impacted":["better_prices", "fewer_unnecessary_tests"],
		"pov":"clinician"
	}
}

var actions = {
	// universal access
	"single_payer":{
		"name":"Create Single Payer System",
		"behaviors_impacted":["private_options","everyone_gets_covered"],
		"category":"Universal Access"
	},
	"give_patients_data":{
		"name":"Give Patients Their Data",
		"behaviors_impacted":["self_care","pt_take_charge"],
		"category":"Universal Access"
	},
	"on_demand":{
		"name":"Enable On-Demand Care",
		"behaviors_impacted":["self_care"],
		"category":"Universal Access"
	},
	"train_workers":{
		"name":"Train More Primary Care Workers",
		"behaviors_impacted":["primary_care"],
		"category":"Universal Access"
	},
	"data_standard":{
		"name":"Create Health Data Standard",
		"behaviors_impacted":["improve_interoperability","people_shop"],
		"category":"Universal Access"
	},

	// near perfect quality
	"destigmatize_death":{
		"name":"Destigmatize Death",
		"behaviors_impacted":["people_value_life"],
		"category":"Near Perfect Quality"
	},
	"improve_doctor_training":{
		"name":"Improve Doctor Training",
		"behaviors_impacted":["clinicians_communicate"],
		"category":"Near Perfect Quality"
	},
	"coordinate_care":{
		"name":"Coordinate Care",
		"behaviors_impacted":["clinicians_communicate"],
		"category":"Near Perfect Quality"
	},
	"individualize_medicine":{
		"name":"Individuzalize Medicine",
		"behaviors_impacted":["tailored_treatment_plans"],
		"category":"Near Perfect Quality"
	},

	// much better prices
	"make_prices_transparent":{
		"name":"Make Prices Transparent",
		"behaviors_impacted":["people_shop"],
		"category":"Much Better Prices"
	},
	"incentivize_outcomes":{
		"name":"Incentivize Outcomes",
		"behaviors_impacted":["clinicians_bill"],
		"category":"Much Better Prices"
	},
	"reform_malpractice":{
		"name":"Reform Malpractice Laws",
		"behaviors_impacted":["clinicians_are_not_penalized_by_law"],
		"category":"Much Better Prices"
	}
}


var action_key;
for(action_key in actions){
	// iterates through all actions
	var current_action = actions[action_key];
	var action_name = current_action['name'];
	var category_name = current_action['category'];
	var behavior_id;
	for(behavior_id = 0; behavior_id < current_action['behaviors_impacted'].length; behavior_id++){
		var behavior_key = current_action['behaviors_impacted'][behavior_id];
		if(behaviors[behavior_key]){
			var current_behavior = behaviors[behavior_key];
			var behavior_name = current_behavior['name'];
			var results_id;
			for(results_id = 0; results_id < current_behavior['results_impacted'].length; results_id++){
				var results_key = current_behavior['results_impacted'][results_id]
				if(results[results_key]){
					var current_result = results[results_key];
					var results_name = current_result['name'];
					console.log(category_name + "," + action_name + "," + behavior_name + "," + results_name);
				}
				else{
					console.error("Missing result for key:" + results_key);
				}
			}
		}
		else{
		console.error("Missing behavior for key:" + behavior_key);
		}
	}
	console.log("----END---");
}


