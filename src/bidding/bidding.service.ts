import { Inject, Injectable } from '@nestjs/common'
import { NotificationService } from 'src/notification/notification.service'

@Injectable()
export class BiddingService {
  private startTime: Date = null
  constructor(private readonly notificationService: NotificationService) {}

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
        id: Number
        maxBidPrice: Number
        currentBid: Number
        email: string
      }> = [
        {
          id: 4,
          maxBidPrice: 200,
          currentBid: null,
          email: 'sajeel.ahmed@protonmail.com',
        },
        {
          id: 3,
          maxBidPrice: 210,
          currentBid: null,
          email: 'sajeel.ahmed@protonmail.com',
        },
        {
          id: 22,
          maxBidPrice: 207,
          currentBid: null,
          email: 'sajeel.ahmed@protonmail.com',
        },
        {
          id: 1,
          maxBidPrice: 220,
          currentBid: null,
          email: 'sajeel.ahmed@protonmail.com',
        },
      ]

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
          currentPrice = minPrice
        } else {
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

        endTime = new Date()
        difference = endTime.getTime() - this.startTime.getTime()
        resultInMinutes = Math.round(difference / 1000)
      }

      const highestBid = sortedArray[sortedArray.length - 1]

      this.notificationService.notifyUser({
        isFromAdmin: true,
        senderId: 'admin',
        receiverId: highestBid.email,
        message: 'You have woin',
      })

      return sortedArray[sortedArray.length - 1]
    } catch (error) {
      console.error(error)
      return false
    }
  }

  private compare(
    a: {
      id: Number
      maxBidPrice: Number
      currentBid: null
      email: string
    },
    b: {
      id: Number
      maxBidPrice: Number
      currentBid: null
      email: string
    },
  ) {
    if (a.maxBidPrice < b.maxBidPrice) {
      return -1
    }
    if (a.maxBidPrice > b.maxBidPrice) {
      return 1
    }
    return 0
  }

  /**
   *
   * @param array
   * @returns true if deadlock can occur
   */
  private checkForDeadlock(array: Array<any>) {
    let highestBid = array[array.length - 1]
    let count = 0

    array.forEach((element) => {
      if (element.maxBidPrice === highestBid.maxBidPrice) {
        count++
      }
    })

    if (count > 1) {
      return true
    } else {
      return false
    }
  }
}
