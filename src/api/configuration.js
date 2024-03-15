import React, { useEffect } from 'react';
import { Buffer } from 'buffer';
import {useSelector, useDispatch} from 'react-redux'
import { store } from '../app.js'
import { setCountries, setCryptos, setApp } from '../state/actions/configuration';
import { setServer, setApiVersion } from '../state/actions/endpoints';
import API from './api.mjs';
import { setToken } from './user.js';
import NotificationModal from "../components/NotificationModal";
import { showErrorModal, showSuccessModal } from '../state/actions/notification';
import { setAuthentication, setUser } from '../state/actions/account';
import { setOperators, setMobileRechargers, setCurrencies, setBlockchains, setPairs, setDepositAddress } from '../state/actions/configuration';

import { selectGetOperatorsInCountryEndpoint, selectGetMobileRechargersEndpoint, selectGetCurrenciesEndpoint,
        selectGetPairHistoryEndpoint, selectGetDepositAddressEndpoint } from '../state/selectors/endpoints';


export async function setConfig() {
    let countries = {
  AF: {
    name: 'Afghanistan',
    isoCode: 'AF',
    numberPrefix: '+111',
    flag: '/images/countries/AF.svg',
    currencyCode: 'AF',
    currencySymbol: '₦'
  },
  AX: {
    name: 'Åland Islands',
    isoCode: 'AX',
    numberPrefix: '+234',
    flag: '/images/countries/AX.svg',
    currencyCode: 'AX',
    currencySymbol: '₦'
  },
  AL: {
    name: 'Albania',
    isoCode: 'AL',
    numberPrefix: '+234',
    flag: '/images/countries/AL.svg',
    currencyCode: 'AL',
    currencySymbol: '₦'
  },
  DZ: {
    name: 'Algeria',
    isoCode: 'DZ',
    numberPrefix: '+234',
    flag: '/images/countries/DZ.svg',
    currencyCode: 'DZ',
    currencySymbol: '₦'
  },
  AS: {
    name: 'American Samoa',
    isoCode: 'AS',
    numberPrefix: '+234',
    flag: '/images/countries/AS.svg',
    currencyCode: 'AS',
    currencySymbol: '₦'
  },
  AD: {
    name: 'Andorra',
    isoCode: 'AD',
    numberPrefix: '+234',
    flag: '/images/countries/AD.svg',
    currencyCode: 'AD',
    currencySymbol: '₦'
  },
  AO: {
    name: 'Angola',
    isoCode: 'AO',
    numberPrefix: '+234',
    flag: '/images/countries/AO.svg',
    currencyCode: 'AO',
    currencySymbol: '₦'
  },
  AI: {
    name: 'Anguilla',
    isoCode: 'AI',
    numberPrefix: '+234',
    flag: '/images/countries/AI.svg',
    currencyCode: 'AI',
    currencySymbol: '₦'
  },
  AQ: {
    name: 'Antarctica',
    isoCode: 'AQ',
    numberPrefix: '+234',
    flag: '/images/countries/AQ.svg',
    currencyCode: 'AQ',
    currencySymbol: '₦'
  },
  AG: {
    name: 'Antigua and Barbuda',
    isoCode: 'AG',
    numberPrefix: '+234',
    flag: '/images/countries/AG.svg',
    currencyCode: 'AG',
    currencySymbol: '₦'
  },
  AR: {
    name: 'Argentina',
    isoCode: 'AR',
    numberPrefix: '+234',
    flag: '/images/countries/AR.svg',
    currencyCode: 'AR',
    currencySymbol: '₦'
  },
  AM: {
    name: 'Armenia',
    isoCode: 'AM',
    numberPrefix: '+234',
    flag: '/images/countries/AM.svg',
    currencyCode: 'AM',
    currencySymbol: '₦'
  },
  AW: {
    name: 'Aruba',
    isoCode: 'AW',
    numberPrefix: '+234',
    flag: '/images/countries/AW.svg',
    currencyCode: 'AW',
    currencySymbol: '₦'
  },
  AU: {
    name: 'Australia',
    isoCode: 'AU',
    numberPrefix: '+234',
    flag: '/images/countries/AU.svg',
    currencyCode: 'AU',
    currencySymbol: '₦'
  },
  AT: {
    name: 'Austria',
    isoCode: 'AT',
    numberPrefix: '+234',
    flag: '/images/countries/AT.svg',
    currencyCode: 'AT',
    currencySymbol: '₦'
  },
  AZ: {
    name: 'Azerbaijan',
    isoCode: 'AZ',
    numberPrefix: '+234',
    flag: '/images/countries/AZ.svg',
    currencyCode: 'AZ',
    currencySymbol: '₦'
  },
  BS: {
    name: 'Bahamas',
    isoCode: 'BS',
    numberPrefix: '+234',
    flag: '/images/countries/BS.svg',
    currencyCode: 'BS',
    currencySymbol: '₦'
  },
  BH: {
    name: 'Bahrain',
    isoCode: 'BH',
    numberPrefix: '+234',
    flag: '/images/countries/BH.svg',
    currencyCode: 'BH',
    currencySymbol: '₦'
  },
  BD: {
    name: 'Bangladesh',
    isoCode: 'BD',
    numberPrefix: '+234',
    flag: '/images/countries/BD.svg',
    currencyCode: 'BD',
    currencySymbol: '₦'
  },
  BB: {
    name: 'Barbados',
    isoCode: 'BB',
    numberPrefix: '+234',
    flag: '/images/countries/BB.svg',
    currencyCode: 'BB',
    currencySymbol: '₦'
  },
  BY: {
    name: 'Belarus',
    isoCode: 'BY',
    numberPrefix: '+234',
    flag: '/images/countries/BY.svg',
    currencyCode: 'BY',
    currencySymbol: '₦'
  },
  BE: {
    name: 'Belgium',
    isoCode: 'BE',
    numberPrefix: '+234',
    flag: '/images/countries/BE.svg',
    currencyCode: 'BE',
    currencySymbol: '₦'
  },
  BZ: {
    name: 'Belize',
    isoCode: 'BZ',
    numberPrefix: '+234',
    flag: '/images/countries/BZ.svg',
    currencyCode: 'BZ',
    currencySymbol: '₦'
  },
  BJ: {
    name: 'Benin',
    isoCode: 'BJ',
    numberPrefix: '+234',
    flag: '/images/countries/BJ.svg',
    currencyCode: 'BJ',
    currencySymbol: '₦'
  },
  BM: {
    name: 'Bermuda',
    isoCode: 'BM',
    numberPrefix: '+234',
    flag: '/images/countries/BM.svg',
    currencyCode: 'BM',
    currencySymbol: '₦'
  },
  BT: {
    name: 'Bhutan',
    isoCode: 'BT',
    numberPrefix: '+234',
    flag: '/images/countries/BT.svg',
    currencyCode: 'BT',
    currencySymbol: '₦'
  },
  BO: {
    name: 'Bolivia',
    isoCode: 'BO',
    numberPrefix: '+234',
    flag: '/images/countries/BO.svg',
    currencyCode: 'BO',
    currencySymbol: '₦'
  },
  BA: {
    name: 'Bosnia and Herzegovina',
    isoCode: 'BA',
    numberPrefix: '+234',
    flag: '/images/countries/BA.svg',
    currencyCode: 'BA',
    currencySymbol: '₦'
  },
  BW: {
    name: 'Botswana',
    isoCode: 'BW',
    numberPrefix: '+234',
    flag: '/images/countries/BW.svg',
    currencyCode: 'BW',
    currencySymbol: '₦'
  },
  BV: {
    name: 'Bouvet Island',
    isoCode: 'BV',
    numberPrefix: '+234',
    flag: '/images/countries/BV.svg',
    currencyCode: 'BV',
    currencySymbol: '₦'
  },
  BR: {
    name: 'Brazil',
    isoCode: 'BR',
    numberPrefix: '+234',
    flag: '/images/countries/BR.svg',
    currencyCode: 'BR',
    currencySymbol: '₦'
  },
  IO: {
    name: 'British Indian Ocean Territory',
    isoCode: 'IO',
    numberPrefix: '+234',
    flag: '/images/countries/IO.svg',
    currencyCode: 'IO',
    currencySymbol: '₦'
  },
  BN: {
    name: 'Brunei Darussalam',
    isoCode: 'BN',
    numberPrefix: '+234',
    flag: '/images/countries/BN.svg',
    currencyCode: 'BN',
    currencySymbol: '₦'
  },
  BG: {
    name: 'Bulgaria',
    isoCode: 'BG',
    numberPrefix: '+234',
    flag: '/images/countries/BG.svg',
    currencyCode: 'BG',
    currencySymbol: '₦'
  },
  BF: {
    name: 'Burkina Faso',
    isoCode: 'BF',
    numberPrefix: '+234',
    flag: '/images/countries/BF.svg',
    currencyCode: 'BF',
    currencySymbol: '₦'
  },
  BI: {
    name: 'Burundi',
    isoCode: 'BI',
    numberPrefix: '+234',
    flag: '/images/countries/BI.svg',
    currencyCode: 'BI',
    currencySymbol: '₦'
  },
  KH: {
    name: 'Cambodia',
    isoCode: 'KH',
    numberPrefix: '+234',
    flag: '/images/countries/KH.svg',
    currencyCode: 'KH',
    currencySymbol: '₦'
  },
  CM: {
    name: 'Cameroon',
    isoCode: 'CM',
    numberPrefix: '+234',
    flag: '/images/countries/CM.svg',
    currencyCode: 'CM',
    currencySymbol: '₦'
  },
  CA: {
    name: 'Canada',
    isoCode: 'CA',
    numberPrefix: '+234',
    flag: '/images/countries/CA.svg',
    currencyCode: 'CA',
    currencySymbol: '₦'
  },
  CV: {
    name: 'Cape Verde',
    isoCode: 'CV',
    numberPrefix: '+234',
    flag: '/images/countries/CV.svg',
    currencyCode: 'CV',
    currencySymbol: '₦'
  },
  KY: {
    name: 'Cayman Islands',
    isoCode: 'KY',
    numberPrefix: '+234',
    flag: '/images/countries/KY.svg',
    currencyCode: 'KY',
    currencySymbol: '₦'
  },
  CF: {
    name: 'Central African Republic',
    isoCode: 'CF',
    numberPrefix: '+234',
    flag: '/images/countries/CF.svg',
    currencyCode: 'CF',
    currencySymbol: '₦'
  },
  TD: {
    name: 'Chad',
    isoCode: 'TD',
    numberPrefix: '+234',
    flag: '/images/countries/TD.svg',
    currencyCode: 'TD',
    currencySymbol: '₦'
  },
  CL: {
    name: 'Chile',
    isoCode: 'CL',
    numberPrefix: '+234',
    flag: '/images/countries/CL.svg',
    currencyCode: 'CL',
    currencySymbol: '₦'
  },
  CN: {
    name: 'China',
    isoCode: 'CN',
    numberPrefix: '+234',
    flag: '/images/countries/CN.svg',
    currencyCode: 'CN',
    currencySymbol: '₦'
  },
  CX: {
    name: 'Christmas Island',
    isoCode: 'CX',
    numberPrefix: '+234',
    flag: '/images/countries/CX.svg',
    currencyCode: 'CX',
    currencySymbol: '₦'
  },
  CC: {
    name: 'Cocos (Keeling) Islands',
    isoCode: 'CC',
    numberPrefix: '+234',
    flag: '/images/countries/CC.svg',
    currencyCode: 'CC',
    currencySymbol: '₦'
  },
  CO: {
    name: 'Colombia',
    isoCode: 'CO',
    numberPrefix: '+234',
    flag: '/images/countries/CO.svg',
    currencyCode: 'CO',
    currencySymbol: '₦'
  },
  KM: {
    name: 'Comoros',
    isoCode: 'KM',
    numberPrefix: '+234',
    flag: '/images/countries/KM.svg',
    currencyCode: 'KM',
    currencySymbol: '₦'
  },
  CG: {
    name: 'Congo',
    isoCode: 'CG',
    numberPrefix: '+234',
    flag: '/images/countries/CG.svg',
    currencyCode: 'CG',
    currencySymbol: '₦'
  },
  CD: {
    name: 'Congo, The Democratic Republic of The',
    isoCode: 'CD',
    numberPrefix: '+234',
    flag: '/images/countries/CD.svg',
    currencyCode: 'CD',
    currencySymbol: '₦'
  },
  CK: {
    name: 'Cook Islands',
    isoCode: 'CK',
    numberPrefix: '+234',
    flag: '/images/countries/CK.svg',
    currencyCode: 'CK',
    currencySymbol: '₦'
  },
  CR: {
    name: 'Costa Rica',
    isoCode: 'CR',
    numberPrefix: '+234',
    flag: '/images/countries/CR.svg',
    currencyCode: 'CR',
    currencySymbol: '₦'
  },
  CI: {
    name: "Cote D'ivoire",
    isoCode: 'CI',
    numberPrefix: '+234',
    flag: '/images/countries/CI.svg',
    currencyCode: 'CI',
    currencySymbol: '₦'
  },
  HR: {
    name: 'Croatia',
    isoCode: 'HR',
    numberPrefix: '+234',
    flag: '/images/countries/HR.svg',
    currencyCode: 'HR',
    currencySymbol: '₦'
  },
  CU: {
    name: 'Cuba',
    isoCode: 'CU',
    numberPrefix: '+234',
    flag: '/images/countries/CU.svg',
    currencyCode: 'CU',
    currencySymbol: '₦'
  },
  CY: {
    name: 'Cyprus',
    isoCode: 'CY',
    numberPrefix: '+234',
    flag: '/images/countries/CY.svg',
    currencyCode: 'CY',
    currencySymbol: '₦'
  },
  CZ: {
    name: 'Czechia',
    isoCode: 'CZ',
    numberPrefix: '+234',
    flag: '/images/countries/CZ.svg',
    currencyCode: 'CZ',
    currencySymbol: '₦'
  },
  DK: {
    name: 'Denmark',
    isoCode: 'DK',
    numberPrefix: '+234',
    flag: '/images/countries/DK.svg',
    currencyCode: 'DK',
    currencySymbol: '₦'
  },
  DJ: {
    name: 'Djibouti',
    isoCode: 'DJ',
    numberPrefix: '+234',
    flag: '/images/countries/DJ.svg',
    currencyCode: 'DJ',
    currencySymbol: '₦'
  },
  DM: {
    name: 'Dominica',
    isoCode: 'DM',
    numberPrefix: '+234',
    flag: '/images/countries/DM.svg',
    currencyCode: 'DM',
    currencySymbol: '₦'
  },
  DO: {
    name: 'Dominican Republic',
    isoCode: 'DO',
    numberPrefix: '+234',
    flag: '/images/countries/DO.svg',
    currencyCode: 'DO',
    currencySymbol: '₦'
  },
  EC: {
    name: 'Ecuador',
    isoCode: 'EC',
    numberPrefix: '+234',
    flag: '/images/countries/EC.svg',
    currencyCode: 'EC',
    currencySymbol: '₦'
  },
  EG: {
    name: 'Egypt',
    isoCode: 'EG',
    numberPrefix: '+234',
    flag: '/images/countries/EG.svg',
    currencyCode: 'EG',
    currencySymbol: '₦'
  },
  SV: {
    name: 'El Salvador',
    isoCode: 'SV',
    numberPrefix: '+234',
    flag: '/images/countries/SV.svg',
    currencyCode: 'SV',
    currencySymbol: '₦'
  },
  GQ: {
    name: 'Equatorial Guinea',
    isoCode: 'GQ',
    numberPrefix: '+234',
    flag: '/images/countries/GQ.svg',
    currencyCode: 'GQ',
    currencySymbol: '₦'
  },
  ER: {
    name: 'Eritrea',
    isoCode: 'ER',
    numberPrefix: '+234',
    flag: '/images/countries/ER.svg',
    currencyCode: 'ER',
    currencySymbol: '₦'
  },
  EE: {
    name: 'Estonia',
    isoCode: 'EE',
    numberPrefix: '+234',
    flag: '/images/countries/EE.svg',
    currencyCode: 'EE',
    currencySymbol: '₦'
  },
  ET: {
    name: 'Ethiopia',
    isoCode: 'ET',
    numberPrefix: '+234',
    flag: '/images/countries/ET.svg',
    currencyCode: 'ET',
    currencySymbol: '₦'
  },
  FK: {
    name: 'Falkland Islands (Malvinas)',
    isoCode: 'FK',
    numberPrefix: '+234',
    flag: '/images/countries/FK.svg',
    currencyCode: 'FK',
    currencySymbol: '₦'
  },
  FO: {
    name: 'Faroe Islands',
    isoCode: 'FO',
    numberPrefix: '+234',
    flag: '/images/countries/FO.svg',
    currencyCode: 'FO',
    currencySymbol: '₦'
  },
  FJ: {
    name: 'Fiji',
    isoCode: 'FJ',
    numberPrefix: '+234',
    flag: '/images/countries/FJ.svg',
    currencyCode: 'FJ',
    currencySymbol: '₦'
  },
  FI: {
    name: 'Finland',
    isoCode: 'FI',
    numberPrefix: '+234',
    flag: '/images/countries/FI.svg',
    currencyCode: 'FI',
    currencySymbol: '₦'
  },
  FR: {
    name: 'France',
    isoCode: 'FR',
    numberPrefix: '+234',
    flag: '/images/countries/FR.svg',
    currencyCode: 'FR',
    currencySymbol: '₦'
  },
  GF: {
    name: 'French Guiana',
    isoCode: 'GF',
    numberPrefix: '+234',
    flag: '/images/countries/GF.svg',
    currencyCode: 'GF',
    currencySymbol: '₦'
  },
  PF: {
    name: 'French Polynesia',
    isoCode: 'PF',
    numberPrefix: '+234',
    flag: '/images/countries/PF.svg',
    currencyCode: 'PF',
    currencySymbol: '₦'
  },
  TF: {
    name: 'French Southern Territories',
    isoCode: 'TF',
    numberPrefix: '+234',
    flag: '/images/countries/TF.svg',
    currencyCode: 'TF',
    currencySymbol: '₦'
  },
  GA: {
    name: 'Gabon',
    isoCode: 'GA',
    numberPrefix: '+234',
    flag: '/images/countries/GA.svg',
    currencyCode: 'GA',
    currencySymbol: '₦'
  },
  GM: {
    name: 'Gambia',
    isoCode: 'GM',
    numberPrefix: '+234',
    flag: '/images/countries/GM.svg',
    currencyCode: 'GM',
    currencySymbol: '₦'
  },
  GE: {
    name: 'Georgia',
    isoCode: 'GE',
    numberPrefix: '+234',
    flag: '/images/countries/GE.svg',
    currencyCode: 'GE',
    currencySymbol: '₦'
  },
  DE: {
    name: 'Germany',
    isoCode: 'DE',
    numberPrefix: '+234',
    flag: '/images/countries/DE.svg',
    currencyCode: 'DE',
    currencySymbol: '₦'
  },
  GH: {
    name: 'Ghana',
    isoCode: 'GH',
    numberPrefix: '+234',
    flag: '/images/countries/GH.svg',
    currencyCode: 'GH',
    currencySymbol: '₦'
  },
  GI: {
    name: 'Gibraltar',
    isoCode: 'GI',
    numberPrefix: '+234',
    flag: '/images/countries/GI.svg',
    currencyCode: 'GI',
    currencySymbol: '₦'
  },
  GR: {
    name: 'Greece',
    isoCode: 'GR',
    numberPrefix: '+234',
    flag: '/images/countries/GR.svg',
    currencyCode: 'GR',
    currencySymbol: '₦'
  },
  GL: {
    name: 'Greenland',
    isoCode: 'GL',
    numberPrefix: '+234',
    flag: '/images/countries/GL.svg',
    currencyCode: 'GL',
    currencySymbol: '₦'
  },
  GD: {
    name: 'Grenada',
    isoCode: 'GD',
    numberPrefix: '+234',
    flag: '/images/countries/GD.svg',
    currencyCode: 'GD',
    currencySymbol: '₦'
  },
  GP: {
    name: 'Guadeloupe',
    isoCode: 'GP',
    numberPrefix: '+234',
    flag: '/images/countries/GP.svg',
    currencyCode: 'GP',
    currencySymbol: '₦'
  },
  GU: {
    name: 'Guam',
    isoCode: 'GU',
    numberPrefix: '+234',
    flag: '/images/countries/GU.svg',
    currencyCode: 'GU',
    currencySymbol: '₦'
  },
  GT: {
    name: 'Guatemala',
    isoCode: 'GT',
    numberPrefix: '+234',
    flag: '/images/countries/GT.svg',
    currencyCode: 'GT',
    currencySymbol: '₦'
  },
  GG: {
    name: 'Guernsey',
    isoCode: 'GG',
    numberPrefix: '+234',
    flag: '/images/countries/GG.svg',
    currencyCode: 'GG',
    currencySymbol: '₦'
  },
  GN: {
    name: 'Guinea',
    isoCode: 'GN',
    numberPrefix: '+234',
    flag: '/images/countries/GN.svg',
    currencyCode: 'GN',
    currencySymbol: '₦'
  },
  GW: {
    name: 'Guinea-bissau',
    isoCode: 'GW',
    numberPrefix: '+234',
    flag: '/images/countries/GW.svg',
    currencyCode: 'GW',
    currencySymbol: '₦'
  },
  GY: {
    name: 'Guyana',
    isoCode: 'GY',
    numberPrefix: '+234',
    flag: '/images/countries/GY.svg',
    currencyCode: 'GY',
    currencySymbol: '₦'
  },
  HT: {
    name: 'Haiti',
    isoCode: 'HT',
    numberPrefix: '+234',
    flag: '/images/countries/HT.svg',
    currencyCode: 'HT',
    currencySymbol: '₦'
  },
  HM: {
    name: 'Heard Island and Mcdonald Islands',
    isoCode: 'HM',
    numberPrefix: '+234',
    flag: '/images/countries/HM.svg',
    currencyCode: 'HM',
    currencySymbol: '₦'
  },
  VA: {
    name: 'Holy See (Vatican City State)',
    isoCode: 'VA',
    numberPrefix: '+234',
    flag: '/images/countries/VA.svg',
    currencyCode: 'VA',
    currencySymbol: '₦'
  },
  HN: {
    name: 'Honduras',
    isoCode: 'HN',
    numberPrefix: '+234',
    flag: '/images/countries/HN.svg',
    currencyCode: 'HN',
    currencySymbol: '₦'
  },
  HK: {
    name: 'Hong Kong',
    isoCode: 'HK',
    numberPrefix: '+234',
    flag: '/images/countries/HK.svg',
    currencyCode: 'HK',
    currencySymbol: '₦'
  },
  HU: {
    name: 'Hungary',
    isoCode: 'HU',
    numberPrefix: '+234',
    flag: '/images/countries/HU.svg',
    currencyCode: 'HU',
    currencySymbol: '₦'
  },
  IS: {
    name: 'Iceland',
    isoCode: 'IS',
    numberPrefix: '+234',
    flag: '/images/countries/IS.svg',
    currencyCode: 'IS',
    currencySymbol: '₦'
  },
  IN: {
    name: 'India',
    isoCode: 'IN',
    numberPrefix: '+234',
    flag: '/images/countries/IN.svg',
    currencyCode: 'IN',
    currencySymbol: '₦'
  },
  ID: {
    name: 'Indonesia',
    isoCode: 'ID',
    numberPrefix: '+234',
    flag: '/images/countries/ID.svg',
    currencyCode: 'ID',
    currencySymbol: '₦'
  },
  IR: {
    name: 'Iran, Islamic Republic of',
    isoCode: 'IR',
    numberPrefix: '+234',
    flag: '/images/countries/IR.svg',
    currencyCode: 'IR',
    currencySymbol: '₦'
  },
  IQ: {
    name: 'Iraq',
    isoCode: 'IQ',
    numberPrefix: '+234',
    flag: '/images/countries/IQ.svg',
    currencyCode: 'IQ',
    currencySymbol: '₦'
  },
  IE: {
    name: 'Ireland',
    isoCode: 'IE',
    numberPrefix: '+234',
    flag: '/images/countries/IE.svg',
    currencyCode: 'IE',
    currencySymbol: '₦'
  },
  IM: {
    name: 'Isle of Man',
    isoCode: 'IM',
    numberPrefix: '+234',
    flag: '/images/countries/IM.svg',
    currencyCode: 'IM',
    currencySymbol: '₦'
  },
  IL: {
    name: 'Israel',
    isoCode: 'IL',
    numberPrefix: '+234',
    flag: '/images/countries/IL.svg',
    currencyCode: 'IL',
    currencySymbol: '₦'
  },
  IT: {
    name: 'Italy',
    isoCode: 'IT',
    numberPrefix: '+234',
    flag: '/images/countries/IT.svg',
    currencyCode: 'IT',
    currencySymbol: '₦'
  },
  JM: {
    name: 'Jamaica',
    isoCode: 'JM',
    numberPrefix: '+234',
    flag: '/images/countries/JM.svg',
    currencyCode: 'JM',
    currencySymbol: '₦'
  },
  JP: {
    name: 'Japan',
    isoCode: 'JP',
    numberPrefix: '+234',
    flag: '/images/countries/JP.svg',
    currencyCode: 'JP',
    currencySymbol: '₦'
  },
  JE: {
    name: 'Jersey',
    isoCode: 'JE',
    numberPrefix: '+234',
    flag: '/images/countries/JE.svg',
    currencyCode: 'JE',
    currencySymbol: '₦'
  },
  JO: {
    name: 'Jordan',
    isoCode: 'JO',
    numberPrefix: '+234',
    flag: '/images/countries/JO.svg',
    currencyCode: 'JO',
    currencySymbol: '₦'
  },
  KZ: {
    name: 'Kazakhstan',
    isoCode: 'KZ',
    numberPrefix: '+234',
    flag: '/images/countries/KZ.svg',
    currencyCode: 'KZ',
    currencySymbol: '₦'
  },
  KE: {
    name: 'Kenya',
    isoCode: 'KE',
    numberPrefix: '+234',
    flag: '/images/countries/KE.svg',
    currencyCode: 'KE',
    currencySymbol: '₦'
  },
  KI: {
    name: 'Kiribati',
    isoCode: 'KI',
    numberPrefix: '+234',
    flag: '/images/countries/KI.svg',
    currencyCode: 'KI',
    currencySymbol: '₦'
  },
  KP: {
    name: "Korea, Democratic People's Republic of",
    isoCode: 'KP',
    numberPrefix: '+234',
    flag: '/images/countries/KP.svg',
    currencyCode: 'KP',
    currencySymbol: '₦'
  },
  KR: {
    name: 'Korea, Republic of',
    isoCode: 'KR',
    numberPrefix: '+234',
    flag: '/images/countries/KR.svg',
    currencyCode: 'KR',
    currencySymbol: '₦'
  },
  KW: {
    name: 'Kuwait',
    isoCode: 'KW',
    numberPrefix: '+234',
    flag: '/images/countries/KW.svg',
    currencyCode: 'KW',
    currencySymbol: '₦'
  },
  KG: {
    name: 'Kyrgyzstan',
    isoCode: 'KG',
    numberPrefix: '+234',
    flag: '/images/countries/KG.svg',
    currencyCode: 'KG',
    currencySymbol: '₦'
  },
  LA: {
    name: "Lao People's Democratic Republic",
    isoCode: 'LA',
    numberPrefix: '+234',
    flag: '/images/countries/LA.svg',
    currencyCode: 'LA',
    currencySymbol: '₦'
  },
  LV: {
    name: 'Latvia',
    isoCode: 'LV',
    numberPrefix: '+234',
    flag: '/images/countries/LV.svg',
    currencyCode: 'LV',
    currencySymbol: '₦'
  },
  LB: {
    name: 'Lebanon',
    isoCode: 'LB',
    numberPrefix: '+234',
    flag: '/images/countries/LB.svg',
    currencyCode: 'LB',
    currencySymbol: '₦'
  },
  LS: {
    name: 'Lesotho',
    isoCode: 'LS',
    numberPrefix: '+234',
    flag: '/images/countries/LS.svg',
    currencyCode: 'LS',
    currencySymbol: '₦'
  },
  LR: {
    name: 'Liberia',
    isoCode: 'LR',
    numberPrefix: '+234',
    flag: '/images/countries/LR.svg',
    currencyCode: 'LR',
    currencySymbol: '₦'
  },
  LY: {
    name: 'Libyan Arab Jamahiriya',
    isoCode: 'LY',
    numberPrefix: '+234',
    flag: '/images/countries/LY.svg',
    currencyCode: 'LY',
    currencySymbol: '₦'
  },
  LI: {
    name: 'Liechtenstein',
    isoCode: 'LI',
    numberPrefix: '+234',
    flag: '/images/countries/LI.svg',
    currencyCode: 'LI',
    currencySymbol: '₦'
  },
  LT: {
    name: 'Lithuania',
    isoCode: 'LT',
    numberPrefix: '+234',
    flag: '/images/countries/LT.svg',
    currencyCode: 'LT',
    currencySymbol: '₦'
  },
  LU: {
    name: 'Luxembourg',
    isoCode: 'LU',
    numberPrefix: '+234',
    flag: '/images/countries/LU.svg',
    currencyCode: 'LU',
    currencySymbol: '₦'
  },
  MO: {
    name: 'Macao',
    isoCode: 'MO',
    numberPrefix: '+234',
    flag: '/images/countries/MO.svg',
    currencyCode: 'MO',
    currencySymbol: '₦'
  },
  MK: {
    name: 'Macedonia, The Former Yugoslav Republic of',
    isoCode: 'MK',
    numberPrefix: '+234',
    flag: '/images/countries/MK.svg',
    currencyCode: 'MK',
    currencySymbol: '₦'
  },
  MG: {
    name: 'Madagascar',
    isoCode: 'MG',
    numberPrefix: '+234',
    flag: '/images/countries/MG.svg',
    currencyCode: 'MG',
    currencySymbol: '₦'
  },
  MW: {
    name: 'Malawi',
    isoCode: 'MW',
    numberPrefix: '+234',
    flag: '/images/countries/MW.svg',
    currencyCode: 'MW',
    currencySymbol: '₦'
  },
  MY: {
    name: 'Malaysia',
    isoCode: 'MY',
    numberPrefix: '+234',
    flag: '/images/countries/MY.svg',
    currencyCode: 'MY',
    currencySymbol: '₦'
  },
  MV: {
    name: 'Maldives',
    isoCode: 'MV',
    numberPrefix: '+234',
    flag: '/images/countries/MV.svg',
    currencyCode: 'MV',
    currencySymbol: '₦'
  },
  ML: {
    name: 'Mali',
    isoCode: 'ML',
    numberPrefix: '+234',
    flag: '/images/countries/ML.svg',
    currencyCode: 'ML',
    currencySymbol: '₦'
  },
  MT: {
    name: 'Malta',
    isoCode: 'MT',
    numberPrefix: '+234',
    flag: '/images/countries/MT.svg',
    currencyCode: 'MT',
    currencySymbol: '₦'
  },
  MH: {
    name: 'Marshall Islands',
    isoCode: 'MH',
    numberPrefix: '+234',
    flag: '/images/countries/MH.svg',
    currencyCode: 'MH',
    currencySymbol: '₦'
  },
  MQ: {
    name: 'Martinique',
    isoCode: 'MQ',
    numberPrefix: '+234',
    flag: '/images/countries/MQ.svg',
    currencyCode: 'MQ',
    currencySymbol: '₦'
  },
  MR: {
    name: 'Mauritania',
    isoCode: 'MR',
    numberPrefix: '+234',
    flag: '/images/countries/MR.svg',
    currencyCode: 'MR',
    currencySymbol: '₦'
  },
  MU: {
    name: 'Mauritius',
    isoCode: 'MU',
    numberPrefix: '+234',
    flag: '/images/countries/MU.svg',
    currencyCode: 'MU',
    currencySymbol: '₦'
  },
  YT: {
    name: 'Mayotte',
    isoCode: 'YT',
    numberPrefix: '+234',
    flag: '/images/countries/YT.svg',
    currencyCode: 'YT',
    currencySymbol: '₦'
  },
  MX: {
    name: 'Mexico',
    isoCode: 'MX',
    numberPrefix: '+234',
    flag: '/images/countries/MX.svg',
    currencyCode: 'MX',
    currencySymbol: '₦'
  },
  FM: {
    name: 'Micronesia, Federated States of',
    isoCode: 'FM',
    numberPrefix: '+234',
    flag: '/images/countries/FM.svg',
    currencyCode: 'FM',
    currencySymbol: '₦'
  },
  MD: {
    name: 'Moldova, Republic of',
    isoCode: 'MD',
    numberPrefix: '+234',
    flag: '/images/countries/MD.svg',
    currencyCode: 'MD',
    currencySymbol: '₦'
  },
  MC: {
    name: 'Monaco',
    isoCode: 'MC',
    numberPrefix: '+234',
    flag: '/images/countries/MC.svg',
    currencyCode: 'MC',
    currencySymbol: '₦'
  },
  MN: {
    name: 'Mongolia',
    isoCode: 'MN',
    numberPrefix: '+234',
    flag: '/images/countries/MN.svg',
    currencyCode: 'MN',
    currencySymbol: '₦'
  },
  ME: {
    name: 'Montenegro',
    isoCode: 'ME',
    numberPrefix: '+234',
    flag: '/images/countries/ME.svg',
    currencyCode: 'ME',
    currencySymbol: '₦'
  },
  MS: {
    name: 'Montserrat',
    isoCode: 'MS',
    numberPrefix: '+234',
    flag: '/images/countries/MS.svg',
    currencyCode: 'MS',
    currencySymbol: '₦'
  },
  MA: {
    name: 'Morocco',
    isoCode: 'MA',
    numberPrefix: '+234',
    flag: '/images/countries/MA.svg',
    currencyCode: 'MA',
    currencySymbol: '₦'
  },
  MZ: {
    name: 'Mozambique',
    isoCode: 'MZ',
    numberPrefix: '+234',
    flag: '/images/countries/MZ.svg',
    currencyCode: 'MZ',
    currencySymbol: '₦'
  },
  MM: {
    name: 'Myanmar',
    isoCode: 'MM',
    numberPrefix: '+234',
    flag: '/images/countries/MM.svg',
    currencyCode: 'MM',
    currencySymbol: '₦'
  },
  NA: {
    name: 'Namibia',
    isoCode: 'NA',
    numberPrefix: '+234',
    flag: '/images/countries/NA.svg',
    currencyCode: 'NA',
    currencySymbol: '₦'
  },
  NR: {
    name: 'Nauru',
    isoCode: 'NR',
    numberPrefix: '+234',
    flag: '/images/countries/NR.svg',
    currencyCode: 'NR',
    currencySymbol: '₦'
  },
  NP: {
    name: 'Nepal',
    isoCode: 'NP',
    numberPrefix: '+234',
    flag: '/images/countries/NP.svg',
    currencyCode: 'NP',
    currencySymbol: '₦'
  },
  NL: {
    name: 'Netherlands',
    isoCode: 'NL',
    numberPrefix: '+234',
    flag: '/images/countries/NL.svg',
    currencyCode: 'NL',
    currencySymbol: '₦'
  },
  AN: {
    name: 'Netherlands Antilles',
    isoCode: 'AN',
    numberPrefix: '+234',
    flag: '/images/countries/AN.svg',
    currencyCode: 'AN',
    currencySymbol: '₦'
  },
  NC: {
    name: 'New Caledonia',
    isoCode: 'NC',
    numberPrefix: '+234',
    flag: '/images/countries/NC.svg',
    currencyCode: 'NC',
    currencySymbol: '₦'
  },
  NZ: {
    name: 'New Zealand',
    isoCode: 'NZ',
    numberPrefix: '+234',
    flag: '/images/countries/NZ.svg',
    currencyCode: 'NZ',
    currencySymbol: '₦'
  },
  NI: {
    name: 'Nicaragua',
    isoCode: 'NI',
    numberPrefix: '+234',
    flag: '/images/countries/NI.svg',
    currencyCode: 'NI',
    currencySymbol: '₦'
  },
  NE: {
    name: 'Niger',
    isoCode: 'NE',
    numberPrefix: '+234',
    flag: '/images/countries/NE.svg',
    currencyCode: 'NE',
    currencySymbol: '₦'
  },
  NG: {
    name: 'Nigeria',
    isoCode: 'NG',
    numberPrefix: '+234',
    flag: '/images/countries/NG.svg',
    currencyCode: 'NG',
    currencySymbol: '₦'
  },
  NU: {
    name: 'Niue',
    isoCode: 'NU',
    numberPrefix: '+234',
    flag: '/images/countries/NU.svg',
    currencyCode: 'NU',
    currencySymbol: '₦'
  },
  NF: {
    name: 'Norfolk Island',
    isoCode: 'NF',
    numberPrefix: '+234',
    flag: '/images/countries/NF.svg',
    currencyCode: 'NF',
    currencySymbol: '₦'
  },
  MP: {
    name: 'Northern Mariana Islands',
    isoCode: 'MP',
    numberPrefix: '+234',
    flag: '/images/countries/MP.svg',
    currencyCode: 'MP',
    currencySymbol: '₦'
  },
  NO: {
    name: 'Norway',
    isoCode: 'NO',
    numberPrefix: '+234',
    flag: '/images/countries/NO.svg',
    currencyCode: 'NO',
    currencySymbol: '₦'
  },
  OM: {
    name: 'Oman',
    isoCode: 'OM',
    numberPrefix: '+234',
    flag: '/images/countries/OM.svg',
    currencyCode: 'OM',
    currencySymbol: '₦'
  },
  PK: {
    name: 'Pakistan',
    isoCode: 'PK',
    numberPrefix: '+234',
    flag: '/images/countries/PK.svg',
    currencyCode: 'PK',
    currencySymbol: '₦'
  },
  PW: {
    name: 'Palau',
    isoCode: 'PW',
    numberPrefix: '+234',
    flag: '/images/countries/PW.svg',
    currencyCode: 'PW',
    currencySymbol: '₦'
  },
  PS: {
    name: 'Palestinian Territory, Occupied',
    isoCode: 'PS',
    numberPrefix: '+234',
    flag: '/images/countries/PS.svg',
    currencyCode: 'PS',
    currencySymbol: '₦'
  },
  PA: {
    name: 'Panama',
    isoCode: 'PA',
    numberPrefix: '+234',
    flag: '/images/countries/PA.svg',
    currencyCode: 'PA',
    currencySymbol: '₦'
  },
  PG: {
    name: 'Papua New Guinea',
    isoCode: 'PG',
    numberPrefix: '+234',
    flag: '/images/countries/PG.svg',
    currencyCode: 'PG',
    currencySymbol: '₦'
  },
  PY: {
    name: 'Paraguay',
    isoCode: 'PY',
    numberPrefix: '+234',
    flag: '/images/countries/PY.svg',
    currencyCode: 'PY',
    currencySymbol: '₦'
  },
  PE: {
    name: 'Peru',
    isoCode: 'PE',
    numberPrefix: '+234',
    flag: '/images/countries/PE.svg',
    currencyCode: 'PE',
    currencySymbol: '₦'
  },
  PH: {
    name: 'Philippines',
    isoCode: 'PH',
    numberPrefix: '+234',
    flag: '/images/countries/PH.svg',
    currencyCode: 'PH',
    currencySymbol: '₦'
  },
  PN: {
    name: 'Pitcairn',
    isoCode: 'PN',
    numberPrefix: '+234',
    flag: '/images/countries/PN.svg',
    currencyCode: 'PN',
    currencySymbol: '₦'
  },
  PL: {
    name: 'Poland',
    isoCode: 'PL',
    numberPrefix: '+234',
    flag: '/images/countries/PL.svg',
    currencyCode: 'PL',
    currencySymbol: '₦'
  },
  PT: {
    name: 'Portugal',
    isoCode: 'PT',
    numberPrefix: '+234',
    flag: '/images/countries/PT.svg',
    currencyCode: 'PT',
    currencySymbol: '₦'
  },
  PR: {
    name: 'Puerto Rico',
    isoCode: 'PR',
    numberPrefix: '+234',
    flag: '/images/countries/PR.svg',
    currencyCode: 'PR',
    currencySymbol: '₦'
  },
  QA: {
    name: 'Qatar',
    isoCode: 'QA',
    numberPrefix: '+234',
    flag: '/images/countries/QA.svg',
    currencyCode: 'QA',
    currencySymbol: '₦'
  },
  RE: {
    name: 'Reunion',
    isoCode: 'RE',
    numberPrefix: '+234',
    flag: '/images/countries/RE.svg',
    currencyCode: 'RE',
    currencySymbol: '₦'
  },
  RO: {
    name: 'Romania',
    isoCode: 'RO',
    numberPrefix: '+234',
    flag: '/images/countries/RO.svg',
    currencyCode: 'RO',
    currencySymbol: '₦'
  },
  RU: {
    name: 'Russian Federation',
    isoCode: 'RU',
    numberPrefix: '+234',
    flag: '/images/countries/RU.svg',
    currencyCode: 'RU',
    currencySymbol: '₦'
  },
  RW: {
    name: 'Rwanda',
    isoCode: 'RW',
    numberPrefix: '+234',
    flag: '/images/countries/RW.svg',
    currencyCode: 'RW',
    currencySymbol: '₦'
  },
  SH: {
    name: 'Saint Helena',
    isoCode: 'SH',
    numberPrefix: '+234',
    flag: '/images/countries/SH.svg',
    currencyCode: 'SH',
    currencySymbol: '₦'
  },
  KN: {
    name: 'Saint Kitts and Nevis',
    isoCode: 'KN',
    numberPrefix: '+234',
    flag: '/images/countries/KN.svg',
    currencyCode: 'KN',
    currencySymbol: '₦'
  },
  LC: {
    name: 'Saint Lucia',
    isoCode: 'LC',
    numberPrefix: '+234',
    flag: '/images/countries/LC.svg',
    currencyCode: 'LC',
    currencySymbol: '₦'
  },
  PM: {
    name: 'Saint Pierre and Miquelon',
    isoCode: 'PM',
    numberPrefix: '+234',
    flag: '/images/countries/PM.svg',
    currencyCode: 'PM',
    currencySymbol: '₦'
  },
  VC: {
    name: 'Saint Vincent and The Grenadines',
    isoCode: 'VC',
    numberPrefix: '+234',
    flag: '/images/countries/VC.svg',
    currencyCode: 'VC',
    currencySymbol: '₦'
  },
  WS: {
    name: 'Samoa',
    isoCode: 'WS',
    numberPrefix: '+234',
    flag: '/images/countries/WS.svg',
    currencyCode: 'WS',
    currencySymbol: '₦'
  },
  SM: {
    name: 'San Marino',
    isoCode: 'SM',
    numberPrefix: '+234',
    flag: '/images/countries/SM.svg',
    currencyCode: 'SM',
    currencySymbol: '₦'
  },
  ST: {
    name: 'Sao Tome and Principe',
    isoCode: 'ST',
    numberPrefix: '+234',
    flag: '/images/countries/ST.svg',
    currencyCode: 'ST',
    currencySymbol: '₦'
  },
  SA: {
    name: 'Saudi Arabia',
    isoCode: 'SA',
    numberPrefix: '+234',
    flag: '/images/countries/SA.svg',
    currencyCode: 'SA',
    currencySymbol: '₦'
  },
  SN: {
    name: 'Senegal',
    isoCode: 'SN',
    numberPrefix: '+234',
    flag: '/images/countries/SN.svg',
    currencyCode: 'SN',
    currencySymbol: '₦'
  },
  RS: {
    name: 'Serbia',
    isoCode: 'RS',
    numberPrefix: '+234',
    flag: '/images/countries/RS.svg',
    currencyCode: 'RS',
    currencySymbol: '₦'
  },
  SC: {
    name: 'Seychelles',
    isoCode: 'SC',
    numberPrefix: '+234',
    flag: '/images/countries/SC.svg',
    currencyCode: 'SC',
    currencySymbol: '₦'
  },
  SL: {
    name: 'Sierra Leone',
    isoCode: 'SL',
    numberPrefix: '+234',
    flag: '/images/countries/SL.svg',
    currencyCode: 'SL',
    currencySymbol: '₦'
  },
  SG: {
    name: 'Singapore',
    isoCode: 'SG',
    numberPrefix: '+234',
    flag: '/images/countries/SG.svg',
    currencyCode: 'SG',
    currencySymbol: '₦'
  },
  SK: {
    name: 'Slovakia',
    isoCode: 'SK',
    numberPrefix: '+234',
    flag: '/images/countries/SK.svg',
    currencyCode: 'SK',
    currencySymbol: '₦'
  },
  SI: {
    name: 'Slovenia',
    isoCode: 'SI',
    numberPrefix: '+234',
    flag: '/images/countries/SI.svg',
    currencyCode: 'SI',
    currencySymbol: '₦'
  },
  SB: {
    name: 'Solomon Islands',
    isoCode: 'SB',
    numberPrefix: '+234',
    flag: '/images/countries/SB.svg',
    currencyCode: 'SB',
    currencySymbol: '₦'
  },
  SO: {
    name: 'Somalia',
    isoCode: 'SO',
    numberPrefix: '+234',
    flag: '/images/countries/SO.svg',
    currencyCode: 'SO',
    currencySymbol: '₦'
  },
  ZA: {
    name: 'South Africa',
    isoCode: 'ZA',
    numberPrefix: '+234',
    flag: '/images/countries/ZA.svg',
    currencyCode: 'ZA',
    currencySymbol: '₦'
  },
  GS: {
    name: 'South Georgia and The South Sandwich Islands',
    isoCode: 'GS',
    numberPrefix: '+234',
    flag: '/images/countries/GS.svg',
    currencyCode: 'GS',
    currencySymbol: '₦'
  },
  ES: {
    name: 'Spain',
    isoCode: 'ES',
    numberPrefix: '+234',
    flag: '/images/countries/ES.svg',
    currencyCode: 'ES',
    currencySymbol: '₦'
  },
  LK: {
    name: 'Sri Lanka',
    isoCode: 'LK',
    numberPrefix: '+234',
    flag: '/images/countries/LK.svg',
    currencyCode: 'LK',
    currencySymbol: '₦'
  },
  SD: {
    name: 'Sudan',
    isoCode: 'SD',
    numberPrefix: '+234',
    flag: '/images/countries/SD.svg',
    currencyCode: 'SD',
    currencySymbol: '₦'
  },
  SR: {
    name: 'Suriname',
    isoCode: 'SR',
    numberPrefix: '+234',
    flag: '/images/countries/SR.svg',
    currencyCode: 'SR',
    currencySymbol: '₦'
  },
  SJ: {
    name: 'Svalbard and Jan Mayen',
    isoCode: 'SJ',
    numberPrefix: '+234',
    flag: '/images/countries/SJ.svg',
    currencyCode: 'SJ',
    currencySymbol: '₦'
  },
  SZ: {
    name: 'Swaziland',
    isoCode: 'SZ',
    numberPrefix: '+234',
    flag: '/images/countries/SZ.svg',
    currencyCode: 'SZ',
    currencySymbol: '₦'
  },
  SE: {
    name: 'Sweden',
    isoCode: 'SE',
    numberPrefix: '+234',
    flag: '/images/countries/SE.svg',
    currencyCode: 'SE',
    currencySymbol: '₦'
  },
  CH: {
    name: 'Switzerland',
    isoCode: 'CH',
    numberPrefix: '+234',
    flag: '/images/countries/CH.svg',
    currencyCode: 'CH',
    currencySymbol: '₦'
  },
  SY: {
    name: 'Syrian Arab Republic',
    isoCode: 'SY',
    numberPrefix: '+234',
    flag: '/images/countries/SY.svg',
    currencyCode: 'SY',
    currencySymbol: '₦'
  },
  TW: {
    name: 'Taiwan, Province of China',
    isoCode: 'TW',
    numberPrefix: '+234',
    flag: '/images/countries/TW.svg',
    currencyCode: 'TW',
    currencySymbol: '₦'
  },
  TJ: {
    name: 'Tajikistan',
    isoCode: 'TJ',
    numberPrefix: '+234',
    flag: '/images/countries/TJ.svg',
    currencyCode: 'TJ',
    currencySymbol: '₦'
  },
  TZ: {
    name: 'Tanzania, United Republic of',
    isoCode: 'TZ',
    numberPrefix: '+234',
    flag: '/images/countries/TZ.svg',
    currencyCode: 'TZ',
    currencySymbol: '₦'
  },
  TH: {
    name: 'Thailand',
    isoCode: 'TH',
    numberPrefix: '+234',
    flag: '/images/countries/TH.svg',
    currencyCode: 'TH',
    currencySymbol: '₦'
  },
  TL: {
    name: 'Timor-leste',
    isoCode: 'TL',
    numberPrefix: '+234',
    flag: '/images/countries/TL.svg',
    currencyCode: 'TL',
    currencySymbol: '₦'
  },
  TG: {
    name: 'Togo',
    isoCode: 'TG',
    numberPrefix: '+234',
    flag: '/images/countries/TG.svg',
    currencyCode: 'TG',
    currencySymbol: '₦'
  },
  TK: {
    name: 'Tokelau',
    isoCode: 'TK',
    numberPrefix: '+234',
    flag: '/images/countries/TK.svg',
    currencyCode: 'TK',
    currencySymbol: '₦'
  },
  TO: {
    name: 'Tonga',
    isoCode: 'TO',
    numberPrefix: '+234',
    flag: '/images/countries/TO.svg',
    currencyCode: 'TO',
    currencySymbol: '₦'
  },
  TT: {
    name: 'Trinidad and Tobago',
    isoCode: 'TT',
    numberPrefix: '+234',
    flag: '/images/countries/TT.svg',
    currencyCode: 'TT',
    currencySymbol: '₦'
  },
  TN: {
    name: 'Tunisia',
    isoCode: 'TN',
    numberPrefix: '+234',
    flag: '/images/countries/TN.svg',
    currencyCode: 'TN',
    currencySymbol: '₦'
  },
  TR: {
    name: 'Turkey',
    isoCode: 'TR',
    numberPrefix: '+234',
    flag: '/images/countries/TR.svg',
    currencyCode: 'TR',
    currencySymbol: '₦'
  },
  TM: {
    name: 'Turkmenistan',
    isoCode: 'TM',
    numberPrefix: '+234',
    flag: '/images/countries/TM.svg',
    currencyCode: 'TM',
    currencySymbol: '₦'
  },
  TC: {
    name: 'Turks and Caicos Islands',
    isoCode: 'TC',
    numberPrefix: '+234',
    flag: '/images/countries/TC.svg',
    currencyCode: 'TC',
    currencySymbol: '₦'
  },
  TV: {
    name: 'Tuvalu',
    isoCode: 'TV',
    numberPrefix: '+234',
    flag: '/images/countries/TV.svg',
    currencyCode: 'TV',
    currencySymbol: '₦'
  },
  UG: {
    name: 'Uganda',
    isoCode: 'UG',
    numberPrefix: '+234',
    flag: '/images/countries/UG.svg',
    currencyCode: 'UG',
    currencySymbol: '₦'
  },
  UA: {
    name: 'Ukraine',
    isoCode: 'UA',
    numberPrefix: '+234',
    flag: '/images/countries/UA.svg',
    currencyCode: 'UA',
    currencySymbol: '₦'
  },
  AE: {
    name: 'United Arab Emirates',
    isoCode: 'AE',
    numberPrefix: '+234',
    flag: '/images/countries/AE.svg',
    currencyCode: 'AE',
    currencySymbol: '₦'
  },
  GB: {
    name: 'United Kingdom',
    isoCode: 'GB',
    numberPrefix: '+234',
    flag: '/images/countries/GB.svg',
    currencyCode: 'GB',
    currencySymbol: '₦'
  },
  US: {
    name: 'United States',
    isoCode: 'US',
    numberPrefix: '+234',
    flag: '/images/countries/US.svg',
    currencyCode: 'US',
    currencySymbol: '₦'
  },
  UM: {
    name: 'United States Minor Outlying Islands',
    isoCode: 'UM',
    numberPrefix: '+234',
    flag: '/images/countries/UM.svg',
    currencyCode: 'UM',
    currencySymbol: '₦'
  },
  UY: {
    name: 'Uruguay',
    isoCode: 'UY',
    numberPrefix: '+234',
    flag: '/images/countries/UY.svg',
    currencyCode: 'UY',
    currencySymbol: '₦'
  },
  UZ: {
    name: 'Uzbekistan',
    isoCode: 'UZ',
    numberPrefix: '+234',
    flag: '/images/countries/UZ.svg',
    currencyCode: 'UZ',
    currencySymbol: '₦'
  },
  VU: {
    name: 'Vanuatu',
    isoCode: 'VU',
    numberPrefix: '+234',
    flag: '/images/countries/VU.svg',
    currencyCode: 'VU',
    currencySymbol: '₦'
  },
  VE: {
    name: 'Venezuela',
    isoCode: 'VE',
    numberPrefix: '+234',
    flag: '/images/countries/VE.svg',
    currencyCode: 'VE',
    currencySymbol: '₦'
  },
  VN: {
    name: 'Viet Nam',
    isoCode: 'VN',
    numberPrefix: '+234',
    flag: '/images/countries/VN.svg',
    currencyCode: 'VN',
    currencySymbol: '₦'
  },
  VG: {
    name: 'Virgin Islands, British',
    isoCode: 'VG',
    numberPrefix: '+234',
    flag: '/images/countries/VG.svg',
    currencyCode: 'VG',
    currencySymbol: '₦'
  },
  VI: {
    name: 'Virgin Islands, U.S.',
    isoCode: 'VI',
    numberPrefix: '+234',
    flag: '/images/countries/VI.svg',
    currencyCode: 'VI',
    currencySymbol: '₦'
  },
  WF: {
    name: 'Wallis and Futuna',
    isoCode: 'WF',
    numberPrefix: '+234',
    flag: '/images/countries/WF.svg',
    currencyCode: 'WF',
    currencySymbol: '₦'
  },
  EH: {
    name: 'Western Sahara',
    isoCode: 'EH',
    numberPrefix: '+234',
    flag: '/images/countries/EH.svg',
    currencyCode: 'EH',
    currencySymbol: '₦'
  },
  YE: {
    name: 'Yemen',
    isoCode: 'YE',
    numberPrefix: '+234',
    flag: '/images/countries/YE.svg',
    currencyCode: 'YE',
    currencySymbol: '₦'
  },
  ZM: {
    name: 'Zambia',
    isoCode: 'ZM',
    numberPrefix: '+234',
    flag: '/images/countries/ZM.svg',
    currencyCode: 'ZM',
    currencySymbol: '₦'
  },
  ZW: {
    name: 'Zimbabwe',
    isoCode: 'ZW',
    numberPrefix: '+234',
    flag: '/images/countries/ZW.svg',
    currencyCode: 'ZW',
    currencySymbol: '₦'
  }
}

    store.dispatch(setServer({ protocol: "https", host: "utx-application-production.up.railway.app", }));
    store.dispatch(setApiVersion("v1"));
    store.dispatch(setApp({ name: "Universal-FX", namePlural: "Universal-FX's", version: "1", logo: "/images/logo-nobg.png", protocol: "https", host: "universal-fx.onrender.com" }));
    store.dispatch(setCountries(countries));
}

export async function populatePairs(){
    let api = new API();
    api.setHeaders({authorization: "Bearer lOLWToxTSV_nqECS4ltgS4gxtVYCJfUt"});
    const dispatch = store.dispatch;
    let getPairHistoryURL = selectGetPairHistoryEndpoint(store.getState().endpoints);
//    const supportedPairs = useSelector(state => state.configuration.supportedPairs);
    const supportedPairs = ["EURUSD","GBPUSD","USDJPY","NZDUSD","AUDUSD","USDCHF","USDCAD"]


    supportedPairs.map((pairName)=>{
        api.get(
            getPairHistoryURL(pairName),
            (response)=>{
                let currentRate = response.results[0]
                let previousRate = response.results[response.results.length - 1]
//                console.log(currentRate, previousRate)
                let trendData = []

                response.results.map((pair, index)=>{
                    trendData.push([index, pair.c])
                })

                dispatch(setPairs(
                    {
                        name: pairName,
                        rate: currentRate.c,
                        spread: (Math.floor(Math.random() * 20) + 10)/100000,
                        trendData: trendData.reverse(),
                        change: (((currentRate.c - previousRate.c)/previousRate.c) * 100).toFixed(2),
                        icon: `/images/countries/${pairName[0].toLowerCase() + pairName[1].toLowerCase()}.svg`
                    }
                ))
            },
            (errorMessage)=>{
                dispatch(showErrorModal(errorMessage));
            }
        )
    })
}

export async function loopPopulatePairs() {
    let countDown = setInterval(populatePairs, 5000);
}

export async function populateDepositAddress(){
    let api = new API();
    const dispatch = store.dispatch;
    let getDepositAddressURL = selectGetDepositAddressEndpoint(store.getState().endpoints)();

    return api.get(
        getDepositAddressURL,
        (response)=>{
            dispatch(setDepositAddress(response.address))
        },
        (errorMessage)=>{
            dispatch(showErrorModal(errorMessage));
        }
    )
}



export async function populateOperators(){
    let api = new API();
    const dispatch = store.dispatch;
    let getOperatorsInCountryURL = selectGetOperatorsInCountryEndpoint(store.getState().endpoints)(store.getState().buyAirtimeForm.formData.mobileRechargerId,
                                                                        store.getState().buyAirtimeForm.formData.countryCode);
    let formData = {}

    setToken();
    return api.get(
        getOperatorsInCountryURL,
        formData,
        (response)=>{
            let operators = { ...response.data }
            dispatch(setOperators(operators))
        },
        (errorMessage)=>{
            dispatch(showErrorModal(errorMessage));
        }
    )
}

export async function populateMobileRechargers(){
    let api = new API();
    const dispatch = store.dispatch;
    let getMobileRechargersURL = selectGetMobileRechargersEndpoint(store.getState().endpoints)();
    let formData = {}

    setToken();
    return api.get(
        getMobileRechargersURL,
        formData,
        (response)=>{
            let mobileRechargers = response.data
            let allMobileRechargers = {}

            mobileRechargers.map((mobileRecharger)=>{
                allMobileRechargers[mobileRecharger.name] = mobileRecharger;
            })

            dispatch(setMobileRechargers(allMobileRechargers))
        },
        (errorMessage)=>{
            dispatch(showErrorModal(errorMessage));
        }
    )
}

export async function populateCurrencies(){
    let api = new API();
    const dispatch = store.dispatch;
    let getCurrenciesURL = selectGetCurrenciesEndpoint(store.getState().endpoints)();
    let formData = {}

    setToken();
    return api.get(
        getCurrenciesURL,
        formData,
        (response)=>{
            let currencies = response.data
            let allCurrencies = {}

            currencies.map((currency)=>{
                allCurrencies[currency.currencyId] = currency;
            })

            dispatch(setCurrencies(allCurrencies))
        },
        (errorMessage)=>{
            dispatch(showErrorModal(errorMessage));
        }
    )
}