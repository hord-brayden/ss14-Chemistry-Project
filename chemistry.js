let inventory = {};
let reactions = [
    //  YAML reaction data to JSON 
];

// Function to add chemicals to the inventory
function addChemical() {
    let chemical = document.getElementById('chemical').value;
    let amount = parseInt(document.getElementById('amount').value);
    inventory[chemical] = (inventory[chemical] || 0) + amount;
    console.log(inventory);
}

// Function to calculate possible reactions based on the current inventory
function calculateReactions() {
    let possibleReactions = [];
    reactions.forEach(reaction => {
        let canPerform = true;
        Object.keys(reaction.reactants).forEach(reactant => {
            if (!inventory[reactant] || inventory[reactant] < reaction.reactants[reactant].amount) {
                canPerform = false;
            }
        });
        if (canPerform) possibleReactions.push(reaction);
    });
    displayResults(possibleReactions);
}

// Function to get the recipe for a selected product
function getRecipe() {
    let product = document.getElementById('productSelector').value;
    let requiredReaction = reactions.find(reaction => reaction.products.hasOwnProperty(product));
    if (requiredReaction) {
        displayResults([requiredReaction]);
    } else {
        document.getElementById('outputArea').innerHTML = 'No reaction produces this product.';
    }
}

// Function to display results
function displayResults(data) {
    let resultsArea = document.getElementById('outputArea');
    resultsArea.innerHTML = ''; // Clear previous results
    data.forEach(reaction => {
        let reactionDetails = `<p>Reaction ID: ${reaction.id}<br>`;
        reactionDetails += 'Reactants: ' + JSON.stringify(reaction.reactants) + '<br>';
        reactionDetails += 'Products: ' + JSON.stringify(reaction.products) + '<br>';
        reactionDetails += '</p>';
        resultsArea.innerHTML += reactionDetails;
    });
}

// Populate product selector with options
function populateProductSelector() {
    let productSelector = document.getElementById('productSelector');
    reactions.forEach(reaction => {
        Object.keys(reaction.products).forEach(product => {
            let option = document.createElement('option');
            option.value = product;
            option.textContent = product;
            productSelector.appendChild(option);
        });
    });
}

// page loads to populate the product dropdown
window.onload = populateProductSelector;
