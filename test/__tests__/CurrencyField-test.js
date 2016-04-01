/* eslint-disable no-unused-vars */
'use strict';

jest.unmock('../../src/CurrencyField');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import CurrencyField from '../../src/CurrencyField';

describe('CurrencyField', () => {

    let currencyField;

    beforeEach(() => {
        currencyField = TestUtils.renderIntoDocument(
            <CurrencyField
                precision={2}
                separator=','
                delimiter='.'
                unit='R$'/>
        );
    });

    it('parseRawValue', () => {
        expect(currencyField.parseRawValue('R$ 1.000,00')).toEqual(100000);
        expect(currencyField.parseRawValue('R$ 2,20')).toEqual(220);
        expect(currencyField.parseRawValue('R$ 0,00')).toEqual(0);
    });

    it('onChange', () => {
        currencyField = TestUtils.renderIntoDocument(
            <CurrencyField
                precision={2}
                separator=','
                delimiter='.'
                unit='R$'
                value={100.00}
                onChange={(raw, display) => {
                    expect(raw).toEqual(100.00);
                }}/>
        );

        TestUtils.Simulate.change(currencyField);
    });

});
