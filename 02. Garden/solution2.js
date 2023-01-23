class Garden {
    constructor(spaceAvailable) {
        this.spaceAvailable = spaceAvailable;
        this.plants = [];
        this.storage = [];
    }

    addPlant(plantName, spaceRequired) {
        if (this.spaceAvailable < spaceRequired) {
            throw Error("Not enough space in the garden.")
        }

        let plant = {
            plantName,
            spaceRequired,
            ripe: false,
            quantity: 0
        }

        this.spaceAvailable -= spaceRequired;

        this.plants.push(plant);
        return `The ${plantName} has been successfully planted in the garden.`
    }

    ripenPlant(plantName, quantity) {
        let currentPlant = Garden.findPlantByName(plantName, this.plants);
        if (currentPlant == undefined) {
            throw new Error(`There is no ${plantName} in the garden.`);
        }

        if (currentPlant.ripe) {
            throw new Error(`The ${plantName} is already ripe.`);
        }

        if (quantity <= 0) {
            throw new Error(`The quantity cannot be zero or negative.`);
        }

        currentPlant.ripe = true;
        currentPlant.quantity += quantity

        if (quantity == 1) {
            return `${quantity} ${plantName} has successfully ripened.`
        } else {
            return `${quantity} ${plantName}s have successfully ripened.`
        }
    }

    harvestPlant(plantName) {
        let currentPlant = Garden.findPlantByName(plantName, this.plants);

        if (currentPlant == undefined) {
            throw new Error(`There is no ${plantName} in the garden.`)
        }

        if (!currentPlant.ripe) {
            return `The ${plantName} cannot be harvested before it is ripe.`
        }

        this.plants = this.plants.filter((x) => x.plantName != plantName);
        this.storage.push({ plantName, quantity: plant.quantity });
        this.spaceAvailable += currentPlant.spaceRequired
        // add it to storage with plantName and quantity

        return `The ${plantName} has been successfully harvested.`
    }

    generateReport() {
        let result = `The garden has ${this.spaceAvailable} free space left.\n`

        let sortedPlants = this.plants.sort((a, b) => a.plantName.localeCompare(b));
        let plantNames = sortedPlants.map(el => el.plantName);

        result += `Plants in the garden: ${plantNames.join(', ')}\n`;

        if (this.storage.length == 0) {
            result += "Plants in storage: The storage is empty.";
        } else {
            let plantsInStorage = [];
            for (let plant of this.storage) {
                plantsInStorage.push(`${plant.plantName} (${plant.quantity})`)
            }

            result += `Plants in storage: ${plantsInStorage.join(', ')}`;
        }

        return result;
    }

    static findPlantByName(plantName, plants) {
        for (let plant of plants) {
            if (plant.plantName == plantName) {
                return plant;
            }
        }
    }
}


// const myGarden = new Garden(250)
// console.log(myGarden.addPlant('apple', 20));
// console.log(myGarden.addPlant('orange', 200));
// console.log(myGarden.addPlant('olive', 50));


// The apple has been successfully planted in the garden.

// The orange has been successfully planted in the garden.
// Uncaught Error Error: Not enough space in the garden.


// const myGarden = new Garden(250)
// console.log(myGarden.addPlant('apple', 20));
// console.log(myGarden.addPlant('orange', 100));
// console.log(myGarden.addPlant('cucumber', 30));
// console.log(myGarden.ripenPlant('apple', 10));
// console.log(myGarden.ripenPlant('orange', 1));
// console.log(myGarden.ripenPlant('orange', 4));


// The apple has been successfully planted in the garden.
// The orange has been successfully planted in the garden.
// The cucumber has been successfully planted in the garden.
// 10 apples have successfully ripened.
// 1 orange has successfully ripened.
// Uncaught Error Error: The orange is already ripe.


// const myGarden = new Garden(250)
// console.log(myGarden.addPlant('apple', 20));
// console.log(myGarden.addPlant('orange', 100));
// console.log(myGarden.addPlant('cucumber', 30));
// console.log(myGarden.ripenPlant('apple', 10));
// console.log(myGarden.ripenPlant('orange', 1));
// console.log(myGarden.ripenPlant('olive', 30));

// The apple has been successfully planted in the garden.
// The orange has been successfully planted in the garden.
// The cucumber has been successfully planted in the garden.
// 10 apples have successfully ripened.
// 1 orange has successfully ripened.
// Uncaught Error Error: There is no olive in the garden.



// const myGarden = new Garden(250)
// console.log(myGarden.addPlant('apple', 20));
// console.log(myGarden.addPlant('orange', 200));
// console.log(myGarden.addPlant('raspberry', 10));
// console.log(myGarden.ripenPlant('apple', 10));
// console.log(myGarden.ripenPlant('orange', 1));
// console.log(myGarden.harvestPlant('apple'));
// console.log(myGarden.harvestPlant('olive'));

// The apple has been successfully planted in the garden.
// The orange has been successfully planted in the garden.
// The raspberry has been successfully planted in the garden.
// 10 apples have successfully ripened.
// 1 orange has successfully ripened.
// The apple has been successfully harvested.
// Uncaught Error Error: There is no olive in the garden.


const myGarden = new Garden(250)
console.log(myGarden.addPlant('apple', 20));
console.log(myGarden.addPlant('orange', 200));
console.log(myGarden.addPlant('raspberry', 10));
console.log(myGarden.ripenPlant('apple', 10));
console.log(myGarden.ripenPlant('orange', 1));
console.log(myGarden.harvestPlant('orange'));
console.log(myGarden.generateReport());


// The apple has been successfully planted in the garden.
// The orange has been successfully planted in the garden.
// The raspberry has been successfully planted in the garden.
// 10 apples have successfully ripened.
// 1 orange has successfully ripened.
// The orange has been successfully harvested.
// The garden has 220 free space left.
// Plants in the garden: apple, raspberry
// Plants in storage: orange (1)

