import { Injectable } from '@nestjs/common';

@Injectable()
export class BiddingService {
    private startTime: Date = null;

    setStartTime(startTimeArg): void {
        this.startTime = startTimeArg
    }

    async biddingStart(): Promise<String> {
        try {
            const durationMinutes = 1
            let endTime = new Date()
            let difference = endTime.getTime() - this.startTime.getTime()
            let resultInMinutes = Math.round(difference / 60000)

            while (resultInMinutes < durationMinutes) {
                endTime = new Date()
                difference = endTime.getTime() - this.startTime.getTime()
                resultInMinutes = Math.round(difference / 60000)

                console.log(new Date().getMinutes())
            }

            return "End"
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
