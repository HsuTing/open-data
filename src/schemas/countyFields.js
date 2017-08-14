'use strict';

import {
  GraphQLEnumType,
  GraphQLList,
  GraphQLString
} from 'graphql';
import chalk from 'chalk';

import synonym from 'utils/synonym';
import countiesObj from 'constants/counties';

export default key => ({
  county: {
    type: GraphQLString,
    description: '縣市',
    resolve: data => {
      const county = synonym(data[key]);

      if((county).includes(Object.values(countiesObj)))
        console.log(chalk.red(`[graphql] "${county}" is not in counties list.`));

      return county;
    }
  }
});

const values = {};
Object.keys(countiesObj).forEach(county => {
  values[county] = {
    value: county,
    description: countiesObj[county]
  };
});

export const args = {
  counties: {
    type: new GraphQLList(new GraphQLEnumType({
      name: 'CountiesInput',
      description: '縣市名稱',
      values
    }))
  }
};

export const resolve = (
  getData = () => {},
  key = 'County'
) => async (data, {counties}, ctx) => {
  try {
    const {updateTime, data} = await getData(data, args, ctx);

    if(counties) {
      const countiesChiName = counties.map(county => countiesObj[county]);

      return {
        updateTime,
        data: (data || []).filter(d => {
          return (synonym(d[key])).includes(countiesChiName)
        })
      };
    }

    return {
      updateTime,
      data
    };
  } catch(e) {
    console.log(e);
    return {};
  }
};
