import utl from '../Logic/Utility.js';

it('CA different length', () => {
  //
  var first = Array(10).fill(1);
  var second = Array(5).fill(2);

  expect(utl.mdaCompare(first, second)).toEqual(false);
});

it('CA equal arrays', () => {
  
  var first = Array(10).fill(1);
  var second = Array(10).fill(1);

  expect(utl.mdaCompare(first, second)).toEqual(true);
});

it('CA not equal arrays with primitives', () => {
  
  var first = Array(10).fill(1);
  var second = Array(10).fill(2);

  expect(utl.mdaCompare(first, second)).toEqual(false);
});

it('CA not equal arrays with null', () => {
  
  var first = Array(10).fill(null);
  var second = Array(10).fill(1);

  expect(utl.mdaCompare(first, second)).toEqual(false);
});

it('CA not equal arrays reference type', () => {
  
  var first = Array(10).fill({});
  var second = Array(10).fill({});

  expect(utl.mdaCompare(first, second)).toEqual(false);
});

it('CA not equal arrays different elements', () => {
  
  var first = Array(10).fill(1).map(() => Array(10).fill(1));
  var second = Array(10).fill(1);

  expect(utl.mdaCompare(first, second)).toEqual(false);
});

it('CA not equal arrays array-like object', () => {
  
  var first = Array(10).fill(1).map(() => Array(2).fill(1));
  var second = Array(10).fill({}).map(() => ({'0': 1, '1': 1}));

  expect(utl.mdaCompare(first, second)).toEqual(false);
});

it('CA not equal arrays array-like objects', () => {
  
  var first = Array(5).fill(1).map(() => ({'0': 1, '1': 1}));
  var second = Array(5).fill(1).map(() => ({'0': 1, '1': 1}));

  expect(utl.mdaCompare(first, second)).toEqual(false);
});

it('CA equal 2d-arrays', () => {
  
  var first = Array(5).fill(1).map(() => Array(2).fill(true));
  var second = Array(5).fill(1).map(() => Array(2).fill(true));

  expect(utl.mdaCompare(first, second)).toEqual(true);
});

it('CA not equal 2d-arrays', () => {
  
  var first = Array(5).fill(1).map(() => Array(2).fill(false));
  var second = Array(5).fill(1).map(() => Array(2).fill(true));

  expect(utl.mdaCompare(first, second)).toEqual(false);
});

it('CA mutating 2d-arrays', () => {
  
  var first = Array(5).fill(1).map(() => Array(2).fill(false));
  var second = Array(5).fill(1).map(() => Array(2).fill(true));

  expect(utl.mdaCompare(first, second)).toEqual(false);
  first.forEach((el, i)=> {el.fill(true)})
  expect(utl.mdaCompare(first, second)).toEqual(true);
});

it('RAD merge all', () => {
  
  var first = Array(5).fill(1);
  var second = Array(5).fill(2);
  
  expect(utl.replaceArrData(first, second, 0)).toEqual(Array(5).fill(2));
});

it('RAD merge ok no start position', () => {
  
  var first = Array(5).fill(1);
  var second = Array(5).fill(2);
  
  expect(utl.replaceArrData(first, second)).toEqual(Array(5).fill(2));
});

it('RAD merge with position', () => {
  
  var first = Array(5).fill(1);
  var second = Array(5).fill(2);
  
  var res = Array(5).fill(2);
  res[0] = 1;
  expect(utl.replaceArrData(first, second, 1)).toEqual(res);
});

it('RAD merge only last element', () => {
  
  var first = Array(5).fill(1);
  var second = Array(5).fill(2);
  
  var res = Array(5).fill(1);
  res[4] = 2;
  expect(utl.replaceArrData(first, second, 4)).toEqual(res);
});

it('RAD merge outside bound of acceptor', () => {
  
  var first = Array(5).fill(1);
  var second = Array(5).fill(2);
  
  var res = Array(5).fill(1);
  expect(utl.replaceArrData(first, second, 10)).toEqual(res);
});

it('RAD merge small source', () => {
  
  var first = Array(15).fill(1);
  var second = Array(3).fill(2);
  
  var res = Array(15).fill(1);
  res[5] = 2;
  res[6] = 2;
  res[7] = 2;
  expect(utl.replaceArrData(first, second, 5)).toEqual(res);
});

it('RAD merge small source no start position', () => {
  
  var first = Array(15).fill(1);
  var second = Array(3).fill(2);
  
  var res = Array(15).fill(1);
  res[5] = 2;
  res[6] = 2;
  res[7] = 2;
  expect(utl.replaceArrData(first, second, 5)).toEqual(res);
});

it('RAD merge small acceptor', () => {
  
  var first = Array(5).fill(1);
  var second = Array(10).fill(2);
  
  var res = Array(5).fill(1);
  res[3] = 2;
  res[4] = 2;
  expect(utl.replaceArrData(first, second, 3)).toEqual(res);
});

it('RAD merge small acceptor no start', () => {
  
  var first = Array(5).fill(1);
  var second = Array(10).fill(2);
  
  expect(utl.replaceArrData(first, second)).toEqual(Array(5).fill(2));
});

it('M2DA exact merge', () => {
  
  var target = Array(10).fill(0).map(() => Array(10).fill(0))
  var source = Array(10).fill(0).map(() => Array(10).fill(1))
  expect(utl.merge2DArrays(target, source)).toEqual(Array(10).fill(0).map(() => Array(10).fill(1)));
});

it('M2DA small source fits center', () => {
  
  var target = Array(7).fill(0).map(() => Array(7).fill(0))
  var source = Array(5).fill(0).map(() => Array(5).fill(1))
  expect(utl.merge2DArrays(target, source, 1, 1)).toEqual(
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
  
  var target = Array(7).fill(0).map(() => Array(7).fill(0))
  var source = Array(5).fill(0).map(() => Array(5).fill(1))
  expect(utl.merge2DArrays(target, source)).toEqual(
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
  
  var target = Array(7).fill(0).map(() => Array(7).fill(0))
  var source = Array(5).fill(0).map(() => Array(5).fill(1))
  expect(utl.merge2DArrays(target, source, 3, 3)).toEqual(
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
  
  var target = Array(5).fill(0).map(() => Array(5).fill(0))
  var source = Array(7).fill(0).map(() => Array(7).fill(1))
  expect(utl.merge2DArrays(target, source, 3, 3)).toEqual(
  [ [ 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 1, 1 ],
    [ 0, 0, 0, 1, 1 ] ]
  );
});

it('M2DA small target no start position' , () => {
  
  var target = Array(5).fill(0).map(() => Array(5).fill(0))
  var source = Array(7).fill(0).map(() => Array(7).fill(1))
  expect(utl.merge2DArrays(target, source)).toEqual(
  [ [ 1, 1, 1, 1, 1 ],
    [ 1, 1, 1, 1, 1 ],
    [ 1, 1, 1, 1, 1 ],
    [ 1, 1, 1, 1, 1 ],
    [ 1, 1, 1, 1, 1 ] ]
  );
});

it('M2DA empty source' , () => {
  
  var target = Array(5).fill(0).map(() => Array(5).fill(0));
  var source = Array(0).fill(1);
  //console.log(utl.merge2DArrays(target, source));
  expect(utl.merge2DArrays(target, source)).toEqual(
  [ [ 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0 ] ]
  );
});

it('M2DA step by step changes' , () => {
  
  var target = Array(7).fill(0).map(() => Array(7).fill(0))
  var source = Array(5).fill(0).map(() => Array(5).fill(1))
  
  target = utl.merge2DArrays(target, source, 1, 1);
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
  target = utl.merge2DArrays(target, source, 2, 2);
  
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
  target = utl.merge2DArrays(target, source, 3, 3);
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

it('M2DA check result row and column - deprecated' , () => {
  return ;
  var target = Array(15).fill(0).map(() => Array(15).fill(0));
  var source = Array(4).fill(0).map(() => Array(4).fill(1));
  var res = utl.merge2DArrays(target, source, 10, 5);
  //console.log(res);
  expect(res.column).toEqual(8);
  expect(res.row).toEqual(13);
});

it('C2DA 1' , () => {
  
  var target = Array(10).fill(0).map(() => Array(10).fill(0));
  target =
  [ [ 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 1, 1, 1, 1, 1, 0 ],
    [ 0, 1, 0, 0, 0, 1, 0 ],
    [ 0, 1, 0, 1, 0, 1, 0 ],
    [ 0, 1, 0, 0, 0, 1, 0 ],
    [ 0, 1, 1, 1, 1, 1, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0 ] ]
  
  var expected = 
  [ [ 1, 1, 1, 1, 1 ],
    [ 1, 0, 0, 0, 1 ],
    [ 1, 0, 1, 0, 1 ],
    [ 1, 0, 0, 0, 1 ],
    [ 1, 1, 1, 1, 1 ] ]
  var res = utl.crop2dArray(target, 1, 1, 5);
  expect(res).toEqual(expected);
});

it('C2DA 2' , () => {
  
  var target = Array(10).fill(0).map(() => Array(10).fill(0));
  target =
  [ [ 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 1, 1, 1, 1, 1, 0 ],
    [ 0, 1, 0, 0, 0, 1, 0 ],
    [ 0, 1, 0, 1, 0, 1, 0 ],
    [ 0, 1, 0, 0, 0, 1, 0 ],
    [ 0, 1, 1, 1, 1, 1, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0 ] ]
  
  var expected = 
  [ [ 0, 0, 0, 0 ], 
    [ 0, 1, 1, 1 ], 
    [ 0, 1, 0, 0 ], 
    [ 0, 1, 0, 1 ] ]
  var res = utl.crop2dArray(target, 0, 0, 4);
  expect(res).toEqual(expected);
});





it('C2DA out of source' , () => {
  
  var target =   
  [ [ 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 1, 1, 1, 1, 1, 0 ],
    [ 0, 1, 0, 0, 0, 1, 0 ],
    [ 0, 1, 0, 1, 0, 1, 0 ],
    [ 0, 1, 0, 0, 0, 1, 0 ],
    [ 0, 1, 1, 1, 1, 1, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0 ] ]
  
  var expected = [ 
    [ 0, 0, 1, 0 ],
    [ 1, 1, 1, 0 ],
    [ 0, 0, 0, 0 ] 
  ];
  var res = utl.crop2dArray(target, 4, 3, 5);
  expect(res).toEqual(expected);
});

it('C2DA out of source 2' , () => {
  
  var target =   
  [ [ 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 1, 1, 1, 1, 1, 0 ],
    [ 0, 1, 0, 0, 0, 1, 0 ],
    [ 0, 1, 0, 1, 0, 1, 0 ],
    [ 0, 1, 0, 0, 0, 1, 0 ],
    [ 0, 1, 1, 1, 1, 1, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0 ] ]
  
  var expected = [ 
    [ 0, 0, 0, 1, 0 ],
    [ 0, 1, 0, 1, 0 ],
    [ 0, 0, 0, 1, 0 ],
    [ 1, 1, 1, 1, 0 ],
    [ 0, 0, 0, 0, 0 ] 
  ];
  var res = utl.crop2dArray(target, 2, 2, 50);
  expect(res).toEqual(expected);
});

it('C2DA last' , () => {
  
  var target =   
  [ [ 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 1, 1, 1, 1, 1, 0 ],
    [ 0, 1, 0, 0, 0, 1, 0 ],
    [ 0, 1, 0, 1, 0, 1, 0 ],
    [ 0, 1, 0, 0, 0, 1, 0 ],
    [ 0, 1, 1, 1, 1, 1, 0 ],
    [ 0, 0, 0, 0, 0, 0, 7 ] ]
  
  var expected = [ [7] ];
  var res = utl.crop2dArray(target, 6, 6, 1);
  expect(res).toEqual(expected);
});


it('C2DA first' , () => {
  
  var target =   
  [ [ 2, 0, 0, 0, 0, 0, 0 ],
    [ 0, 1, 1, 1, 1, 1, 0 ],
    [ 0, 1, 0, 0, 0, 1, 0 ],
    [ 0, 1, 0, 1, 0, 1, 0 ],
    [ 0, 1, 0, 0, 0, 1, 0 ],
    [ 0, 1, 1, 1, 1, 1, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0 ] ]
  
  var expected = [ [2] ];
  var res = utl.crop2dArray(target, 0, 0, 1);
  expect(res).toEqual(expected);
});

it('C2DA copy' , () => {
  
  var target =   
  [ [ 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 1, 1, 1, 1, 1, 0 ],
    [ 0, 1, 0, 0, 0, 1, 0 ],
    [ 0, 1, 0, 1, 0, 1, 0 ],
    [ 0, 1, 0, 0, 0, 1, 0 ]]
  
  var expected = 
  [ [ 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 1, 1, 1, 1, 1, 0 ],
    [ 0, 1, 0, 0, 0, 1, 0 ],
    [ 0, 1, 0, 1, 0, 1, 0 ],
    [ 0, 1, 0, 0, 0, 1, 0 ]]
  var res = utl.crop2dArray(target, 0, 0, target[0].length);
  expect(res).toEqual(expected);
});

it('PBI simple' , () => {
  
   var expected = {
    row: 2,
    column: 3
  }

  var res = utl.positionByIndex(5, 13);
  expect(res).toEqual(expected);
});

it('PBI zero-index column' , () => {
  
   var expected = {
    row: 3,
    column: 0
  }

  var res = utl.positionByIndex(5, 15);
  expect(res).toEqual(expected);
});

it('PBI zero-index row' , () => {
  
   var expected = {
    row: 0,
    column: 2
  }

  var res = utl.positionByIndex(3, 2);
  expect(res).toEqual(expected);
});

it('PBI zero rows' , () => {
  
   var expected = {
    row: 0, 
    column: 0 
  }

  var res = utl.positionByIndex(0, 15);
  expect(res).toEqual(expected);
});

it('PBI zero index' , () => {
  
   var expected = {
    row: 0, 
    column: 0 
  }

  var res = utl.positionByIndex(5, 0);
  expect(res).toEqual(expected);
});

it('PBI wrong params' , () => {
  
  expect(() => utl.positionByIndex('qwe', 1)).toThrow('wrong params');
});

it('PBI wrong params 2' , () => {
  
  expect(() => utl.positionByIndex('qwe', 'qwe')).toThrow('wrong params');
});

it('PBI wrong params 3' , () => {
  
  expect(() => utl.positionByIndex(8, 'qwe')).toThrow('wrong params');
});

