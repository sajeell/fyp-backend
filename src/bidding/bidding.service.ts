import { Injectable } from '@nestjs/common';

@Injectable()
export class BiddingService {
    private startTime: Date = null;

    setStartTime(startTimeArg): void {
        this.startTime = startTimeArg
    }

    /**
     * @returns true if success, false if error
     */
    public async biddingStart(): Promise<any> {
        try {
            const durationMinutes = 5
            let endTime = new Date()
            let difference = endTime.getTime() - this.startTime.getTime()
            let resultInMinutes = Math.round(difference / 1000)

            let participants: Array<{
                id: Number,
                maxBidPrice: Number,
                currentBid: Number
            }> = [{
                id: 4,
                maxBidPrice: 200,
                currentBid: null
            }, {
                id: 3,
                maxBidPrice: 210,
                currentBid: null
            }, {
                id: 22,
                maxBidPrice: 207,
                currentBid: null
            }, {
                id: 1,
                maxBidPrice: 220,
                currentBid: null
            }]

            const minPrice = 198
            const increment = 4
            let currentPrice = 0

            let sortedArray = participants.sort(this.compare)
            let checkForDeadlock = this.checkForDeadlock(sortedArray)

            if (checkForDeadlock === true) {
                return false
            }

            while (resultInMinutes < durationMinutes) {
                if (currentPrice === 0) {
                    currentPrice = minPrice + increment
                }
                else {
                    currentPrice = currentPrice + increment
                }

                participants = participants.map((element) => {
                    const incrementValue = currentPrice + increment
                    if (incrementValue <= element.maxBidPrice) {
                        element.currentBid = incrementValue
                    }
                    return element
                })

                sortedArray = participants.sort(this.compare)

                checkForDeadlock = this.checkForDeadlock(sortedArray)
                if (checkForDeadlock === true) {
                    return false
                }

                const highestBid = sortedArray[sortedArray.length - 1]

                endTime = new Date()
                difference = endTime.getTime() - this.startTime.getTime()
                resultInMinutes = Math.round(difference / 1000)
            }

            return sortedArray[sortedArray.length - 1]
        } catch (error) {
            console.error(error)
            return false
        }
    }

    private compare(a: {
        id: Number,
        maxBidPrice: Number,
        currentBid: null
    }, b: {
        id: Number,
        maxBidPrice: Number,
        currentBid: null
    }) {
        if (a.maxBidPrice < b.maxBidPrice) {
            return -1;
        }
        if (a.maxBidPrice > b.maxBidPrice) {
            return 1;
        }
        return 0;
    }


    /**
     * 
     * @param array 
     * @returns true if deadlock can occur
     */
    private checkForDeadlock(array) {
        let highestBid = array[array.length - 1]
        let count = 0

        array.forEach(element => {
            if (element.maxBidPrice === highestBid.maxBidPrice) {
                count++
            }
        });

        if (count > 1) {
            return true
        } else {
            return false
        }
    }
}
