'use strict';

const assert = require('assert');
const sinon = require('sinon');
const rewiremock = require('rewiremock/node');
const nodeProcess = require('node:process');
// const utils = new PlaywrightUtils();

let browser;
let page;
let expandButton, languageChoiceEnglish, usernameField, passwordField, selectedLanguage, languageDropdown, languageDropdownButton;
let submitButtonParent, submitButton, myCards;
let userMenu, avatar, settings;
let response;
let fillStub, clickStub, waitStub;
let componentFromAdminSettings_cardTitle,
	componentFromAdminSettings_cardItemTitle,
	componentFromAdminSettings_inputControl,
	componentFromAdminSettings_allSettings,
	componentFromAdminSettings_dashboard;
let navigationMenue, navigationPopup, navigationPopupText;
let getEntryInTable_Table, getEntryInTable_Tablerow, getEntryInTable_TablerowColumns, getEntryInTable_TablerowColumnText;
const getEntryInTable_TablerowColumnText_String = 'hopefully the right String';
let getNumberOfResults_Card, getNumberOfResults_Label, getNumberOfResults_InnerText;
let clearFilter_TagGroup, clearFilter_Button;

let rewiremockPlaywrightUtilFile;
let PlaywrightUtil;
let PlaywrightConstants;

describe('PlaywrightUtils', function () {
	before(function () {
		this.timeout(0);
		rewiremockPlaywrightUtilFile = rewiremock.proxy(() => require('../src/util/PlaywrightUtils'), {
			[require.resolve('node:process')]: nodeProcess
		});
		PlaywrightUtil = rewiremockPlaywrightUtilFile.PlaywrightUtil;
		PlaywrightConstants = rewiremockPlaywrightUtilFile.PlaywrightConstants;
	});
	beforeEach(function () {
		PlaywrightConstants.doNotWaitForCards = true;
		response = { ok: sinon.stub().returns(false) };
		page = {
			getByText: sinon.stub(),
			getByRole: sinon.stub(),
			goto: sinon.stub(),
			locator: sinon.stub(),
			waitForResponse: sinon.stub().resolves(response),
			close: sinon.stub()
		};

		page.getByRole.withArgs('tablist').returns({
			locator: sinon
				.stub()
				.withArgs('div')
				.returns({
					filter: sinon
						.stub()
						.withArgs({ hasText: 'Home' })
						.returns({
							first: sinon.stub().returns({
								waitFor: sinon.stub()
							})
						})
				})
		});

		fillStub = { fill: sinon.stub() };
		clickStub = { click: sinon.stub() };
		waitStub = { waitFor: sinon.stub() };

		expandButton = clickStub;
		page.getByRole.withArgs('button', { name: 'Expand' }).returns(expandButton);

		languageChoiceEnglish = clickStub;
		const languageButton = { filter: sinon.stub() };
		languageButton.filter.withArgs({ hasText: 'English' }).returns(languageChoiceEnglish);
		page.locator.withArgs(PlaywrightConstants.uiComponents.SAP_CRM_LIST_ITEM).returns(languageButton);

		submitButton = clickStub;
		submitButtonParent = { locator: sinon.stub() };
		submitButtonParent.locator.withArgs('button', { hasText: 'Sign In' }).returns(submitButton);
		page.locator.withArgs('#loginSubmit').returns(submitButtonParent);

		usernameField = fillStub;
		page.locator.withArgs('input[type="text"]').returns(usernameField);

		passwordField = fillStub;
		page.locator.withArgs('input[type="password"]').returns(passwordField);

		selectedLanguage = 'English';
		languageDropdownButton = clickStub;
		languageDropdownButton.innerText = sinon.stub().returns(selectedLanguage);
		languageDropdownButton.isVisible = sinon.stub().returns(true);
		languageDropdown = {
			getByRole: sinon.stub().returns(languageDropdownButton)
		};
		page.locator.withArgs('sap-crm-drop-down-button').returns(languageDropdown);

		avatar = clickStub;
		userMenu = { locator: sinon.stub(), waitFor: sinon.stub() };
		userMenu.locator.withArgs('sap-crm-avatar').returns(avatar);
		page.locator.withArgs('sap-crm-popover[title="User Menu"]').returns(userMenu);

		myCards = { waitFor: sinon.stub() };
		page.locator.withArgs(PlaywrightConstants.uiComponents.SAP_CRM_LABEL, { hasText: 'My Cards' }).returns(myCards);

		settings = clickStub;
		page.locator.withArgs(PlaywrightConstants.uiComponents.SAP_CRM_LIST_ITEM, { hasText: 'Settings' }).returns(settings);

		componentFromAdminSettings_allSettings = clickStub;
		page.getByText.withArgs('All Settings').returns(componentFromAdminSettings_allSettings);

		componentFromAdminSettings_dashboard = waitStub;
		page.getByText.withArgs('Dashboard').returns(componentFromAdminSettings_dashboard);

		componentFromAdminSettings_inputControl = fillStub;
		page.locator.withArgs('#inputControl').returns(componentFromAdminSettings_inputControl);

		componentFromAdminSettings_cardItemTitle = clickStub;
		componentFromAdminSettings_cardTitle = { getByText: sinon.stub() };
		componentFromAdminSettings_cardTitle.getByText.withArgs('settingCardItemTitle').returns(componentFromAdminSettings_cardItemTitle);
		page.locator.withArgs('sap-crm-card', { hasText: 'settingCardTitle' }).returns(componentFromAdminSettings_cardTitle);

		navigationMenue = clickStub;
		page.getByRole.withArgs('button', { name: 'Navigation Menu' }).returns(navigationMenue);

		navigationPopup = { getByText: sinon.stub() };
		navigationPopupText = clickStub;
		navigationPopup.getByText.withArgs('Accounts', { exact: true }).returns(navigationPopupText);
		page.locator.withArgs('#navigationPopup').returns(navigationPopup);

		getEntryInTable_Table = { nth: sinon.stub() };
		getEntryInTable_Tablerow = { locator: sinon.stub() };
		getEntryInTable_TablerowColumnText = { innerText: sinon.stub().returns(getEntryInTable_TablerowColumnText_String) };
		getEntryInTable_TablerowColumns = { count: sinon.stub().returns(1), nth: sinon.stub().returns(getEntryInTable_TablerowColumnText) };
		getEntryInTable_Tablerow.locator.withArgs('td').returns(getEntryInTable_TablerowColumns);
		getEntryInTable_Table.nth.withArgs(0).returns(getEntryInTable_Tablerow);

		getNumberOfResults_Label = { locator: sinon.stub() };
		getNumberOfResults_Card = { locator: sinon.stub() };
		getNumberOfResults_InnerText = { innerText: sinon.stub().returns('Accounts(81236)') };
		getNumberOfResults_Label.locator.withArgs(PlaywrightConstants.uiComponents.SAP_CRM_LABEL).returns(getNumberOfResults_InnerText);
		getNumberOfResults_Card.locator.withArgs('sap-crm-titlebar').returns(getNumberOfResults_Label);
		page.locator.withArgs('sap-crm-card').returns(getNumberOfResults_Card);

		clearFilter_TagGroup = { locator: sinon.stub() };
		clearFilter_Button = { isVisible: sinon.stub().returns(true), click: sinon.stub() };
		clearFilter_TagGroup.locator.withArgs('sap-crm-tag', { hasText: 'Clear All' }).returns(clearFilter_Button);
		page.locator.withArgs('sap-crm-tag-group').returns(clearFilter_TagGroup);

		browser = {
			newPage: sinon.stub().resolves(page)
		};
	});
	it('failed login and Open Page Test', async function () {
		const url = 'testURL.com';
		selectedLanguage = 'Takatuka';
		languageDropdownButton.innerText = sinon.stub().returns(selectedLanguage);
		languageDropdownButton.isVisible = sinon.stub().onCall(0).returns(false);
		languageDropdownButton.isVisible = sinon.stub().onCall(1).returns(true);
		try {
			const returnPage = await PlaywrightUtil.openPageAndLogin(browser, url);
			sinon.assert.calledOnce(browser.newPage);
			assert.notDeepStrictEqual(returnPage, undefined);
		} catch (error) {
			assert.deepStrictEqual(error.message, 'Login failed');
		}

		sinon.assert.calledOnceWithExactly(page.goto, url);
		assert.deepStrictEqual(clickStub.click.callCount, 3); //ENGLISH not pre-selected
		sinon.assert.calledTwice(fillStub.fill);

		assert.deepStrictEqual(page.locator.getCall(0).args, ['input[type="text"]']);
		assert.deepStrictEqual(page.locator.getCall(1).args, ['input[type="password"]']);
		assert.deepStrictEqual(page.locator.getCall(2).args, ['sap-crm-drop-down-button']);
		// assert.deepStrictEqual(page.locator.getCall(3).args, ['sap-crm-drop-down-button']);
		// assert.deepStrictEqual(page.locator.getCall(4).args, ['sap-crm-drop-down-button']);
		assert.deepStrictEqual(page.locator.getCall(3).args, ['sap-crm-list-item']);
		assert.deepStrictEqual(page.locator.getCall(4).args, ['#loginSubmit']);
	});
	it('succesfull login and Open Page Test', async function () {
		const url = 'testURL.com';
		response.ok = sinon.stub().returns(true);
		try {
			const returnPage = await PlaywrightUtil.openPageAndLogin(browser, url);
			sinon.assert.calledOnce(browser.newPage);
			assert.notDeepStrictEqual(returnPage, undefined);
		} catch (error) {
			assert.notDeepStrictEqual(error.message, 'Login failed');
		}

		sinon.assert.calledOnceWithExactly(page.goto, url);
		assert.deepStrictEqual(clickStub.click.callCount, 1); //ENGLISH pre-selected
		sinon.assert.calledTwice(fillStub.fill);
		if (!PlaywrightConstants.doNotWaitForCards) {
			sinon.assert.calledOnce(myCards.waitFor); //homeScreenDoNotWaitForCards
		}

		assert.deepStrictEqual(page.locator.getCall(0).args, ['input[type="text"]']);
		assert.deepStrictEqual(page.locator.getCall(1).args, ['input[type="password"]']);
		assert.deepStrictEqual(page.locator.getCall(2).args, ['sap-crm-drop-down-button']); //sap-crm-list-item
		// assert.deepStrictEqual(page.locator.getCall(3).args, ['sap-crm-drop-down-button']);
		assert.deepStrictEqual(page.locator.getCall(3).args, ['#loginSubmit']);
		if (!PlaywrightConstants.doNotWaitForCards) {
			assert.deepStrictEqual(page.locator.getCall(5).args, [PlaywrightConstants.uiComponents.SAP_CRM_LABEL, { hasText: 'My Cards' }]); //homeScreenDoNotWaitForCards
		}
	});

	it('openPageAndLogin (execute disabled coding for coverage)', async function () {
		PlaywrightConstants.doNotWaitForCards = false;
		const url = 'testURL.com';
		response.ok = sinon.stub().returns(true);
		const returnPage = await PlaywrightUtil.openPageAndLogin(browser, url);
		assert.notDeepStrictEqual(returnPage, undefined);
	});

	it('openAdminSettings', async function () {
		await PlaywrightUtil.openAdminSettings(page);
		assert.deepStrictEqual(page.locator.getCall(0).args, ['sap-crm-popover[title="User Menu"]']);
		assert.deepStrictEqual(page.locator.getCall(1).args, [PlaywrightConstants.uiComponents.SAP_CRM_LIST_ITEM, { hasText: 'Settings' }]);
		sinon.assert.calledTwice(clickStub.click);
	});

	it('openComponentFromAdminSettings', async function () {
		await PlaywrightUtil.openComponentFromAdminSettings(page, 'settingCardTitle', 'settingCardItemTitle');
	});

	it('openComponentFromAdminSettings (execute without using AdminSettingsSearch)', async function () {
		await PlaywrightUtil.openComponentFromAdminSettings(page, 'settingCardTitle', 'settingCardItemTitle', false);
	});

	it('openTap', async function () {
		await PlaywrightUtil.openPageFromNavMenu(page, 'Accounts');
	});

	it('convertStringToDate', async function () {
		// const jan = await PlaywrightUtil.convertStringToDate('Jan 25, 2023, 3:46:22 PM');
		const jan = await PlaywrightUtil.convertStringToDate('Jan 25, 2023, 12:46:22 PM');
		const feb = await PlaywrightUtil.convertStringToDate('Feb 25, 2023, 3:46:22 PM');
		const mar = await PlaywrightUtil.convertStringToDate('Mar 25, 2023, 3:46:22 PM');
		const apr = await PlaywrightUtil.convertStringToDate('Apr 25, 2023, 3:46:22 PM');
		const may = await PlaywrightUtil.convertStringToDate('May 25, 2023, 3:46:22 PM');
		const jun = await PlaywrightUtil.convertStringToDate('Jun 25, 2023, 3:46:22 AM');
		const jul = await PlaywrightUtil.convertStringToDate('Jul 25, 2023, 3:46:22 PM');
		const aug = await PlaywrightUtil.convertStringToDate('Aug 25, 2023, 3:46:22 PM');
		const sep = await PlaywrightUtil.convertStringToDate('Sep 25, 2023, 3:46:22 PM');
		const oct = await PlaywrightUtil.convertStringToDate('Oct 25, 2023, 3:46:22 PM');
		const nov = await PlaywrightUtil.convertStringToDate('Nov 25, 2023, 3:46:22 PM');
		const dec = await PlaywrightUtil.convertStringToDate('Dec 25, 2023, 3:46:22 PM');
		const dateWoSec = await PlaywrightUtil.convertStringToDate('Dec 25, 2023, 3:46 PM');
		const dateEN = await PlaywrightUtil.convertStringToDate('02/25/2023, 3:46:22 PM');
		const dateAmEN = await PlaywrightUtil.convertStringToDate('06/25/2023, 3:46:22 AM');
		const dateWoSecEN = await PlaywrightUtil.convertStringToDate('12/25/2023, 3:46 PM');
		// assert.deepStrictEqual(jan.getTime(), 1674661582000 + (jan.getTimezoneOffset()*60000));
		assert.deepStrictEqual(jan.getTime(), 1674650782000 + jan.getTimezoneOffset() * 60000);
		assert.deepStrictEqual(feb.getTime(), 1677339982000 + feb.getTimezoneOffset() * 60000);
		assert.deepStrictEqual(mar.getTime(), 1679759182000 + mar.getTimezoneOffset() * 60000);
		assert.deepStrictEqual(apr.getTime(), 1682437582000 + apr.getTimezoneOffset() * 60000);
		assert.deepStrictEqual(may.getTime(), 1685029582000 + may.getTimezoneOffset() * 60000);
		assert.deepStrictEqual(jun.getTime(), 1687664782000 + jun.getTimezoneOffset() * 60000);
		assert.deepStrictEqual(jul.getTime(), 1690299982000 + jul.getTimezoneOffset() * 60000);
		assert.deepStrictEqual(aug.getTime(), 1692978382000 + aug.getTimezoneOffset() * 60000);
		assert.deepStrictEqual(sep.getTime(), 1695656782000 + sep.getTimezoneOffset() * 60000);
		assert.deepStrictEqual(oct.getTime(), 1698248782000 + oct.getTimezoneOffset() * 60000);
		assert.deepStrictEqual(nov.getTime(), 1700927182000 + nov.getTimezoneOffset() * 60000);
		assert.deepStrictEqual(dec.getTime(), 1703519182000 + dec.getTimezoneOffset() * 60000);
		assert.deepStrictEqual(dateWoSec.getTime(), 1703519160000 + dateWoSec.getTimezoneOffset() * 60000);
		assert.deepStrictEqual(dateEN.getTime(), feb.getTime());
		assert.deepStrictEqual(dateAmEN.getTime(), jun.getTime());
		assert.deepStrictEqual(dateWoSecEN.getTime(), dateWoSec.getTime());
	});

	it('getEntryInTable', async function () {
		assert.deepStrictEqual(await PlaywrightUtil.getEntryInTable(getEntryInTable_Table, 0), [getEntryInTable_TablerowColumnText_String]);
		assert.notDeepStrictEqual(await PlaywrightUtil.getEntryInTable(getEntryInTable_Table, 0), ['hopefully the wrong String']);
	});

	it('convertStringToDate', async function () {
		assert.equal(await PlaywrightUtil.getNumberOfResults(page), 81236);
	});

	it('clearFilter', async function () {
		await PlaywrightUtil.clearFilter(page);
		clearFilter_Button = { isVisible: sinon.stub().returns(false), click: sinon.stub() };
		clearFilter_TagGroup.locator.withArgs('sap-crm-tag', { hasText: 'Clear All' }).returns(clearFilter_Button);
		page.locator.withArgs('sap-crm-tag-group').returns(clearFilter_TagGroup);
		await PlaywrightUtil.clearFilter(page);
	});

	it('wait', async function () {
		await PlaywrightUtil.wait(1);
	});

	it('closeDetailViewByTabName', async function () {
		const orgUnitDetailViewTabName = 'Organizational Unit | MC67320';
		const closeButtonOnOrgUnitDetailViewTab = {
			click: sinon.stub()
		};
		const orgUnitDetailViewTab = {
			hover: sinon.stub(),
			click: sinon.stub(),
			locator: sinon.stub().withArgs('button').returns(closeButtonOnOrgUnitDetailViewTab)
		};
		page.getByRole.withArgs('tab', { name: orgUnitDetailViewTabName }).returns(orgUnitDetailViewTab);
		await PlaywrightUtil.closeDetailViewByTabName(page, orgUnitDetailViewTabName);
		sinon.assert.called(orgUnitDetailViewTab.hover);
		sinon.assert.called(closeButtonOnOrgUnitDetailViewTab.click);
	});
});
