import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import Utility from './Utility';

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
// });


it('CA different length', () => {
  var utility = new Utility();
  var first = Array(10).fill(1);
  var second = Array(5).fill(2);

  expect(utility.mdaCompare(first, second)).toEqual(false);
});

it('CA equal arrays', () => {
  var utility = new Utility();
  var first = Array(10).fill(1);
  var second = Array(10).fill(1);

  expect(utility.mdaCompare(first, second)).toEqual(true);
});

it('CA not equal arrays with primitives', () => {
  var utility = new Utility();
  var first = Array(10).fill(1);
  var second = Array(10).fill(2);

  expect(utility.mdaCompare(first, second)).toEqual(false);
});

it('CA not equal arrays with null', () => {
  var utility = new Utility();
  var first = Array(10).fill(null);
  var second = Array(10).fill(1);

  expect(utility.mdaCompare(first, second)).toEqual(false);
});

it('CA not equal arrays reference type', () => {
  var utility = new Utility();
  var first = Array(10).fill({});
  var second = Array(10).fill({});

  expect(utility.mdaCompare(first, second)).toEqual(false);
});

it('CA not equal arrays different elements', () => {
  var utility = new Utility();
  var first = Array(10).fill(1).map(() => Array(10).fill(1));
  var second = Array(10).fill(1);

  expect(utility.mdaCompare(first, second)).toEqual(false);
});

it('CA not equal arrays array-like object', () => {
  var utility = new Utility();
  var first = Array(10).fill(1).map(() => Array(2).fill(1));
  var second = Array(10).fill({}).map(() => ({'0': 1, '1': 1}));

  expect(utility.mdaCompare(first, second)).toEqual(false);
});

it('CA not equal arrays array-like objects', () => {
  var utility = new Utility();
  var first = Array(5).fill(1).map(() => ({'0': 1, '1': 1}));
  var second = Array(5).fill(1).map(() => ({'0': 1, '1': 1}));

  expect(utility.mdaCompare(first, second)).toEqual(false);
});

it('CA equal 2d-arrays', () => {
  var utility = new Utility();
  var first = Array(5).fill(1).map(() => Array(2).fill(true));
  var second = Array(5).fill(1).map(() => Array(2).fill(true));

  expect(utility.mdaCompare(first, second)).toEqual(true);
});

it('CA not equal 2d-arrays', () => {
  var utility = new Utility();
  var first = Array(5).fill(1).map(() => Array(2).fill(false));
  var second = Array(5).fill(1).map(() => Array(2).fill(true));

  expect(utility.mdaCompare(first, second)).toEqual(false);
});

it('CA mutating 2d-arrays', () => {
  var utility = new Utility();
  var first = Array(5).fill(1).map(() => Array(2).fill(false));
  var second = Array(5).fill(1).map(() => Array(2).fill(true));

  expect(utility.mdaCompare(first, second)).toEqual(false);
  first.forEach((el, i)=> {el.fill(true)})
  expect(utility.mdaCompare(first, second)).toEqual(true);
});

it('RAD merge all', () => {
  var utility = new Utility();
  var first = Array(5).fill(1);
  var second = Array(5).fill(2);
  
  expect(utility.replaceArrData(first, second, 0)).toEqual(Array(5).fill(2));
});

it('RAD merge ok no start position', () => {
  var utility = new Utility();
  var first = Array(5).fill(1);
  var second = Array(5).fill(2);
  
  expect(utility.replaceArrData(first, second)).toEqual(Array(5).fill(2));
});

it('RAD merge with position', () => {
  var utility = new Utility();
  var first = Array(5).fill(1);
  var second = Array(5).fill(2);
  
  var res = Array(5).fill(2);
  res[0] = 1;
  expect(utility.replaceArrData(first, second, 1)).toEqual(res);
});

it('RAD merge only last element', () => {
  var utility = new Utility();
  var first = Array(5).fill(1);
  var second = Array(5).fill(2);
  
  var res = Array(5).fill(1);
  res[4] = 2;
  expect(utility.replaceArrData(first, second, 4)).toEqual(res);
});

it('RAD merge outside bound of acceptor', () => {
  var utility = new Utility();
  var first = Array(5).fill(1);
  var second = Array(5).fill(2);
  
  var res = Array(5).fill(1);
  expect(utility.replaceArrData(first, second, 10)).toEqual(res);
});

it('RAD merge small source', () => {
  var utility = new Utility();
  var first = Array(15).fill(1);
  var second = Array(3).fill(2);
  
  var res = Array(15).fill(1);
  res[5] = 2;
  res[6] = 2;
  res[7] = 2;
  expect(utility.replaceArrData(first, second, 5)).toEqual(res);
});

it('RAD merge small source no start position', () => {
  var utility = new Utility();
  var first = Array(15).fill(1);
  var second = Array(3).fill(2);
  
  var res = Array(15).fill(1);
  res[5] = 2;
  res[6] = 2;
  res[7] = 2;
  expect(utility.replaceArrData(first, second, 5)).toEqual(res);
});

it('RAD merge small acceptor', () => {
  var utility = new Utility();
  var first = Array(5).fill(1);
  var second = Array(10).fill(2);
  
  var res = Array(5).fill(1);
  res[3] = 2;
  res[4] = 2;
  expect(utility.replaceArrData(first, second, 3)).toEqual(res);
});

it('RAD merge small acceptor no start', () => {
  var utility = new Utility();
  var first = Array(5).fill(1);
  var second = Array(10).fill(2);
  
  expect(utility.replaceArrData(first, second)).toEqual(Array(5).fill(2));
});

it('M2DA exact merge', () => {
  var utility = new Utility();
  var target = Array(10).fill(0).map(() => Array(10).fill(0))
  var source = Array(10).fill(0).map(() => Array(10).fill(1))
  expect(utility.merge2DArrays(target, source).result).toEqual(Array(10).fill(0).map(() => Array(10).fill(1)));
});

it('M2DA small source fits center', () => {
  var utility = new Utility();
  var target = Array(7).fill(0).map(() => Array(7).fill(0))
  var source = Array(5).fill(0).map(() => Array(5).fill(1))
  expect(utility.merge2DArrays(target, source, 1, 1).result).toEqual(
  [ [ 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 1, 1, 1, 1, 1, 0 ],
    [ 0, 1, 1, 1, 1, 1, 0 ],
    [ 0, 1, 1, 1, 1, 1, 0 ],
    [ 0, 1, 1, 1, 1, 1, 0 ],
    [ 0, 1, 1, 1, 1, 1, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0 ] ]
  );
});

it('M2DA small source no position params', () => {
  var utility = new Utility();
  var target = Array(7).fill(0).map(() => Array(7).fill(0))
  var source = Array(5).fill(0).map(() => Array(5).fill(1))
  expect(utility.merge2DArrays(target, source).result).toEqual(
  [ [ 1, 1, 1, 1, 1, 0, 0 ],
    [ 1, 1, 1, 1, 1, 0, 0 ],
    [ 1, 1, 1, 1, 1, 0, 0 ],
    [ 1, 1, 1, 1, 1, 0, 0 ],
    [ 1, 1, 1, 1, 1, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0 ] ]
  );
});

it('M2DA small source beyond the bounds of target' , () => {
  var utility = new Utility();
  var target = Array(7).fill(0).map(() => Array(7).fill(0))
  var source = Array(5).fill(0).map(() => Array(5).fill(1))
  expect(utility.merge2DArrays(target, source, 3, 3).result).toEqual(
  [ [ 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 1, 1, 1, 1 ],
    [ 0, 0, 0, 1, 1, 1, 1 ],
    [ 0, 0, 0, 1, 1, 1, 1 ],
    [ 0, 0, 0, 1, 1, 1, 1 ] ]
  );
});

it('M2DA small target beyond the bounds of target' , () => {
  var utility = new Utility();
  var target = Array(5).fill(0).map(() => Array(5).fill(0))
  var source = Array(7).fill(0).map(() => Array(7).fill(1))
  expect(utility.merge2DArrays(target, source, 3, 3).result).toEqual(
  [ [ 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 1, 1 ],
    [ 0, 0, 0, 1, 1 ] ]
  );
});

it('M2DA small target no start position' , () => {
  var utility = new Utility();
  var target = Array(5).fill(0).map(() => Array(5).fill(0))
  var source = Array(7).fill(0).map(() => Array(7).fill(1))
  expect(utility.merge2DArrays(target, source).result).toEqual(
  [ [ 1, 1, 1, 1, 1 ],
    [ 1, 1, 1, 1, 1 ],
    [ 1, 1, 1, 1, 1 ],
    [ 1, 1, 1, 1, 1 ],
    [ 1, 1, 1, 1, 1 ] ]
  );
});

it('M2DA empty source' , () => {
  var utility = new Utility();
  var target = Array(5).fill(0).map(() => Array(5).fill(0));
  var source = Array(0).fill(1);
  //console.log(utility.merge2DArrays(target, source));
  expect(utility.merge2DArrays(target, source).result).toEqual(
  [ [ 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0 ] ]
  );
});

it('M2DA step by step changes' , () => {
  var utility = new Utility();
  var target = Array(7).fill(0).map(() => Array(7).fill(0))
  var source = Array(5).fill(0).map(() => Array(5).fill(1))
  
  target = utility.merge2DArrays(target, source, 1, 1).result;
  expect(target).toEqual(
  [ [ 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 1, 1, 1, 1, 1, 0 ],
    [ 0, 1, 1, 1, 1, 1, 0 ],
    [ 0, 1, 1, 1, 1, 1, 0 ],
    [ 0, 1, 1, 1, 1, 1, 0 ],
    [ 0, 1, 1, 1, 1, 1, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0 ] ]
  );
  source = Array(3).fill(0).map(() => Array(3).fill(0))
  target = utility.merge2DArrays(target, source, 2, 2).result;
  
  expect(target).toEqual(
    [ [ 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 1, 1, 1, 1, 1, 0 ],
    [ 0, 1, 0, 0, 0, 1, 0 ],
    [ 0, 1, 0, 0, 0, 1, 0 ],
    [ 0, 1, 0, 0, 0, 1, 0 ],
    [ 0, 1, 1, 1, 1, 1, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0 ] ]
  );

  source = Array(1).fill(Array(1).fill(1))
  target = utility.merge2DArrays(target, source, 3, 3).result;
  expect(target).toEqual(
  [ [ 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 1, 1, 1, 1, 1, 0 ],
    [ 0, 1, 0, 0, 0, 1, 0 ],
    [ 0, 1, 0, 1, 0, 1, 0 ],
    [ 0, 1, 0, 0, 0, 1, 0 ],
    [ 0, 1, 1, 1, 1, 1, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0 ] ]
  );
});

it('M2DA empty source' , () => {
  var utility = new Utility();
  var target = Array(15).fill(0).map(() => Array(15).fill(0));
  var source = Array(4).fill(0).map(() => Array(4).fill(1));
  var res = utility.merge2DArrays(target, source, 10, 5);
  console.log(res.result, res.column, res.row);
  expect(utility.merge2DArrays(target, source, 10, 5).result).toEqual(
   [[ 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0 ]]
  );
});