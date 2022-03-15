import { Injectable } from '@nestjs/common';

@Injectable()
export class BiddingService {
    private startTime: Date = null;

    setStartTime(startTimeArg): void {
        this.startTime = startTimeArg
    }

    async biddingStart(): Promise<Object> {
        try {
            const durationMinutes = 1
            let endTime = new Date()
            let difference = endTime.getTime() - this.startTime.getTime()
            let resultInMinutes = Math.round(difference / 60000)

            const participants = [{
                id: 1,
                maxBidPrice: 200
            }, {
                id: 2,
                maxBidPrice: 210
            }, {
                id: 3,
                maxBidPrice: 207
            }, {
                id: 4,
                maxBidPrice: 220
            }]

            const minPrice = 198

            while (resultInMinutes < durationMinutes) {
                endTime = new Date()
                difference = endTime.getTime() - this.startTime.getTime()
                resultInMinutes = Math.round(difference / 60000)



            }

            return {
                success: true,
                message: 'Success'
            }
        } catch (error) {
            console.error(error)
        }
    }

    private async biddingStarted(): Promise<void> {
        try {
            const date = new Date()
            while (true) {
                console.log(`${date.getHours()}:${date.getMinutes()}`)
            }
        } catch (error) {
            console.error(error)
        }
    }
}
