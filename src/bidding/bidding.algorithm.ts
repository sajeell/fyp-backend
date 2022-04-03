function biddingAlgorithm() {
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
