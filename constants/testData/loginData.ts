// constants/testData.ts
import { faker } from '@faker-js/faker'  // ← industry standard for random data
import {getUIConfig} from '../../config/env'

export const ValidCredentials = getUIConfig()

export const InvalidCredentials = {
    WRONG_PASSWORD:  { username: 'rahulshettyacademy', password: 'wrongpass123' },
    WRONG_USERNAME:  { username: 'wronguser',           password: 'Learning@830$3mK2' },
    BOTH_WRONG:      { username: 'wronguser',           password: 'wrongpass123' },
    EMPTY_PASSWORD:  { username: 'rahulshettyacademy',  password: '' },
    EMPTY_USERNAME:  { username: '',                    password: 'Learning@830$3mK2' },
}

// random/dynamic data using faker
export const RandomUser = {
    name:       faker.person.fullName(),
    email:      faker.internet.email(),
    phone:      faker.phone.number(),
    address:    faker.location.streetAddress(),
}