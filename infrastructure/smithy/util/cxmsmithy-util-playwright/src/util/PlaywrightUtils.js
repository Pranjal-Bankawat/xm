'use strict';

const nodeProcess = require('node:process');

///////////////
// CONSTANTS //
///////////////
const PlaywrightConstants = {
	outputDirectory: {
		artifacts: 'report/playwright/test-results/',
		reports: 'report/playwright/playwright-results/'
	},
	doNotWaitForCards: true, //this.BupaConstants.skipFailingBupaTestUi.bug.homeScreenDoNotWaitForCards
	uiComponents: {
		SAP_CRM_LABEL: 'sap-crm-label',
		SAP_CRM_LIST_ITEM: 'sap-crm-list-item'
	}
};

///////////
// UTILS //
///////////
class PlaywrightUtil {
	static async openPageAndLogin(browser, baseURL, pwUser = nodeProcess.env.PLAYWRIGHT_USER, pwPassword = nodeProcess.env.PLAYWRIGHT_PASSWORD) {
		const page = await browser.newPage();
		await page.goto(baseURL);
		await page.locator('input[type="text"]').fill(pwUser);
		await page.locator('input[type="password"]').fill(pwPassword);
		// Naming is continuously changing 'Expand' / 'Preferred Language' ==> Fallback implemented
		// const languageDropdownNames = ['expand_more', 'Language']; // await page.getByRole('button', { name: 'Expand' }).click();
		// let languageDropdown;
		// for (const languageDropdownName of languageDropdownNames) {
		// 	if (await page.locator('sap-crm-drop-down-button').getByRole('button', { name: languageDropdownName }).isVisible()) {
		// 		languageDropdown = await page.locator('sap-crm-drop-down-button').getByRole('button', { name: languageDropdownName });
		// 						break;
		// 	}
		// }
		const languageDropdown = await page.locator('sap-crm-drop-down-button').getByRole('button'); //Feedback Marcel
		if ((await languageDropdown.innerText()) !== 'English') {
			await languageDropdown.click(); // await languageDropdown.waitFor();
			await page.locator('sap-crm-list-item').filter({ hasText: 'English' }).click();
		}
		const submitButton = page.locator('#loginSubmit');
		const responsePromise = page.waitForResponse(response => response.url().includes('auth/token'));
		await submitButton.locator('button', { hasText: 'Sign In' }).click();
		const response = await responsePromise;
		if (!response.ok()) {
			await page.close();
			throw new Error('Login failed');
		}
		if (!PlaywrightConstants.doNotWaitForCards) {
			await page.locator(PlaywrightConstants.uiComponents.SAP_CRM_LABEL, { hasText: 'My Cards' }).waitFor();
		}
		return page;
	}

	static async openAdminSettings(page) {
		const userMenu = page.locator('sap-crm-popover[title="User Menu"]');
		await userMenu.waitFor();
		await userMenu.locator('sap-crm-avatar').click();
		await page.locator(PlaywrightConstants.uiComponents.SAP_CRM_LIST_ITEM, { hasText: 'Settings' }).click();
	}

	static async openComponentFromAdminSettings(page, settingCardTitle, settingCardItemTitle, useAdminSettingsSearch = true) {
		const homePage = await page.getByRole('tablist').locator('div').filter({ hasText: 'Home' }).first();
		await homePage.waitFor();
		await this.openAdminSettings(page);
		await page.getByText('Dashboard').waitFor();
		// await page.getByText('Dashboard').waitFor({ timeout: 50000 }); // await page.getByText('Dashboard').waitFor(); ==> Looks like extra long timeout required here :-()
		await page.getByText('All Settings').click();
		if (useAdminSettingsSearch) {
			// adminSettingsSearchNotWorking - See BUG: https://jira.tools.sap/browse/STC4CMSPFMD1-3203
			await page.locator('#inputControl').fill(settingCardItemTitle); //filter not required
		}
		await page.locator('sap-crm-card', { hasText: settingCardTitle }).getByText(settingCardItemTitle).click();
	}

	static async openPageFromNavMenu(page, pageName) {
		await page.getByRole('button', { name: 'Navigation Menu' }).click();
		await page.locator('#navigationPopup').getByText(pageName, { exact: true }).click();
	}

	// Different DATE formats in the Change History
	static convertStringToDate(string) {
		let dateString;
		const monthNameToNumber = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		const splitValues = string.replace(',', '').split(' ');
		if (monthNameToNumber.indexOf(splitValues[0]) !== -1) {
			// Jan 25, 2023, 3:46:22 PM
			const month = monthNameToNumber.indexOf(splitValues[0]);
			const timeValues = splitValues[3].split(':');
			let hours = parseInt(timeValues[0]);
			if (splitValues[4] == 'PM' && hours != 12) {
				hours += 12;
			}
			dateString = {
				year: parseInt(splitValues[2]),
				month: month,
				day: parseInt(splitValues[1]),
				hours: hours,
				minutes: parseInt(timeValues[1]),
				seconds: timeValues[2] ? parseInt(timeValues[2]) : 0 // --> no longer passed
			};
		} else {
			// '02/29/2024, 7:56:40 AM'
			const dateValues = splitValues[0].split('/');
			const timeValues = splitValues[1].split(':');
			let hours = parseInt(timeValues[0]);
			if (splitValues[2] == 'PM' && hours != 12) {
				hours += 12;
			}
			dateString = {
				year: parseInt(dateValues[2]),
				month: parseInt(dateValues[0]) - 1,
				day: parseInt(dateValues[1]),
				hours: hours,
				minutes: parseInt(timeValues[1]),
				seconds: timeValues[2] ? parseInt(timeValues[2]) : 0
			};
		}
		const time = new Date(dateString.year, dateString.month, dateString.day, dateString.hours, dateString.minutes, dateString.seconds);
		return time;
	}

	// async convertTimeToString(today) {
	// 	// const today = new Date();
	// 	let monthAsWord;
	// 	switch (today.getUTCMonth()) {
	// 		case 0:
	// 			monthAsWord = 'Jan';
	// 			break;
	// 		case 1:
	// 			monthAsWord = 'Feb';
	// 			break;
	// 		case 2:
	// 			monthAsWord = 'Mar';
	// 			break;
	// 		case 3:
	// 			monthAsWord = 'Apr';
	// 			break;
	// 		case 4:
	// 			monthAsWord = 'May';
	// 			break;
	// 		case 5:
	// 			monthAsWord = 'Jun';
	// 			break;
	// 		case 6:
	// 			monthAsWord = 'Jul';
	// 			break;
	// 		case 7:
	// 			monthAsWord = 'Aug';
	// 			break;
	// 		case 8:
	// 			monthAsWord = 'Sep';
	// 			break;
	// 		case 9:
	// 			monthAsWord = 'Oct';
	// 			break;
	// 		case 10:
	// 			monthAsWord = 'Nov';
	// 			break;
	// 		case 11:
	// 			monthAsWord = 'Dec';
	// 			break;
	// 		default:
	// 			break;
	// 	}
	// 	return monthAsWord + ' ' + today.getUTCDate() + ', ' + today.getUTCFullYear() + ', ' + today.toLocaleTimeString('en-US', { hour12: true });
	// }

	static async getEntryInTable(tableRows, index) {
		const firstRow = await tableRows.nth(index).locator('td');
		const values = [];
		const firstRowLenght = await firstRow.count();
		for (let i = 0; i < firstRowLenght; i++) {
			const element = await firstRow.nth(i).innerText();
			values.push(element);
		}
		return values;
	}

	static async getNumberOfResults(page) {
		const text = await page.locator('sap-crm-card').locator('sap-crm-titlebar').locator(PlaywrightConstants.uiComponents.SAP_CRM_LABEL).innerText();

		//Retrieve the number from the text looking like "Accounts (81236)" and return int: 81236
		return parseInt(text.split('(')[1].split(')')[0]);
	}

	static async clearFilter(page) {
		const clearButton = await page.locator('sap-crm-tag-group').locator('sap-crm-tag', { hasText: 'Clear All' });
		if (await clearButton.isVisible()) {
			await clearButton.click();
		}
	}

	static wait(seconds) {
		return new Promise(resolve => setTimeout(resolve, seconds * 1000));
	}

	static async closeDetailViewByTabName(page, tabName) {
		const tabControl = page.getByRole('tab', { name: tabName });
		await tabControl.hover();
		const closeButton = tabControl.locator('button');
		await closeButton.click();
	}
}

////////////
// EXPORT //
////////////

module.exports = {
	PlaywrightConstants,
	PlaywrightUtil
};
