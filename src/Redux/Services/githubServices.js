import axios from "axios"
import moment from 'moment'

export const githubServices = {
    getContributions
}

const SKYLINE_URL = `https://skyline.github.com/alvinarrazy`
const token = `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`
const username = `alvinarrazy`
const API_URL = `'https://api.github.com/graphql'`

async function getContributions(years) {
    try {
        let githubContributionYearlyData = {}



        for (let y of years) {

            const startDate = moment(y).startOf('year').add(1, 'days').toISOString()
            const endDate = moment(y).startOf('year').add(1, 'years').toISOString()

            const headers = {
                'Authorization': `bearer ${token}`,
            }
            const body = {
                "query": `query {
                    user(login: "${username}") {
                      name
                      contributionsCollection(from: "${startDate}", to: "${endDate}") {
                        contributionCalendar {
                          colors
                          totalContributions
                          weeks {
                            contributionDays {
                              color
                              contributionCount
                              date
                              weekday
                            }
                            firstDay
                          }
                        }
                      }
                    }
                  }`
            }


            const ERROR_MESSAGE = `Data for ${y} not found!`

            let response = await fetch('https://api.github.com/graphql', { method: 'POST', body: JSON.stringify(body), headers: headers })

            if (!response) throw ERROR_MESSAGE

            const { data } = await response.json()

            let parsed = parseData(y, data.user.contributionsCollection.contributionCalendar.weeks)

            githubContributionYearlyData = {
                ...githubContributionYearlyData,
                [`year-${y}`]: parsed
            }
        }

        return {
            result: githubContributionYearlyData
        }

    } catch (error) {
        console.log(error)
        return { error }
    }
}


function parseData(year, data) {
    // console.log(moment("2021-1", "YYYY-M").format('MMMM')) // month start at 1
    //data.contributions
    let daysOnlyData = parseOnlyDay(data)
    let dataPerMonth = {}
    let dayIterations = 0

    for (let month = 1; month <= 12; month++) { //month start at 1
        let monthName = moment(`${year}-${month}`, "YYYY-M").format('MMMM')


        dataPerMonth = {
            ...dataPerMonth,
            [monthName]: {
                label: `Git contributions`,
                fill: true,
                lineTension: 0.3,
                backgroundColor: "rgb(44, 123, 229, 0.2)",
                borderColor: "rgb(44, 123, 229)",
                borderCapStyle: "butt",
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: "miter",
                pointBorderColor: "rgb(44, 123, 229)",
                pointBackgroundColor: "rgb(255, 255, 255)",
                pointBorderWidth: 7,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "#3b506c",
                pointHoverBorderColor: "#95aac9",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: []
            },
        }

        let daysInMonth = moment(`${year}-${month}`, "YYYY-M").daysInMonth()

        for (let d = 0; d < daysInMonth; d++) { //day start at 0
            dataPerMonth[monthName].data.push({
                x: `${d + 1}-${monthName}`,
                y: daysOnlyData[d + dayIterations]
            })
        }
        dayIterations = dayIterations + daysInMonth
    }

    return dataPerMonth
}


function parseOnlyDay(weeks) {

    let weeksFromData = weeks.length
    let dailyValue = []

    for (let w = 0; w < weeksFromData; w++) {
        let { contributionDays } = weeks[w]
        let daysCount = contributionDays.length

        for (let d = 0; d < daysCount; d++) {
            let { contributionCount } = contributionDays[d]
            dailyValue.push(contributionCount)
        }
    }

    return dailyValue
}