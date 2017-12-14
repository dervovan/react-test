import utl from '../Logic/Utility.js';
import StateProcessor from '../Logic/StateProcessor';
import Board from '../ViewModel/Board';

function prepareData ( ){
    var sizeData = {
        boardSize: 30,
        length: 15,
        rowCount: 3,
        columnCount: 5
      };
    var initialState = Array(sizeData.rowCount * sizeData.boardSize)
                        .fill(false)
                        .map(() => Array(sizeData.boardSize * sizeData.columnCount).fill(false));

    return {
        sizeData: sizeData,
        initialState : initialState
    }
}

it('getBoardDataByIndex zero ', () => {
    
    var sizeData = {
        boardSize: 30,
        length: 15,
        rowCount: 3,
        columnCount: 5
      };
    var initialState = Array(sizeData.rowCount * sizeData.boardSize)
                        .fill(false)
                        .map(() => Array(sizeData.boardSize * sizeData.columnCount).fill(false));

    var testData = prepareData();
    var sizeData = testData.sizeData
    var sp = new StateProcessor(sizeData, initialState);
    var res = sp.getBoardDataByIndex(0);

    var data =  Array(sizeData.boardSize)
                .fill(false)
                .map(() => Array(sizeData.boardSize).fill(false));

    var expected =  {
        data: data,
        stateRow: 0,
        stateColumn: 0
    };

    expect(res).toEqual(expected);
});

it('getBoardDataByIndex last ', () => {
    
    var sizeData = {
        boardSize: 30,
        length: 15,
        rowCount: 3,
        columnCount: 5
      };
    var initialState = Array(sizeData.rowCount * sizeData.boardSize)
                        .fill(false)
                        .map(() => Array(sizeData.boardSize * sizeData.columnCount).fill(false));

    var sp = new StateProcessor(sizeData, initialState);
    var res = sp.getBoardDataByIndex(14);
    var data =  Array(sizeData.boardSize)
                .fill(false)
                .map(() => Array(sizeData.boardSize).fill(false));

    var expected =  {
        data: data,
        stateRow: 60,
        stateColumn: 120
    };

    expect(res).toEqual(expected);
});

it('getBoardDataByIndex index inside game field length ', () => {
    
    var sizeData = {
        boardSize: 30,
        length: 15,
        rowCount: 3,
        columnCount: 5
      };
    var initialState = Array(sizeData.rowCount * sizeData.boardSize)
                        .fill(false)
                        .map(() => Array(sizeData.boardSize * sizeData.columnCount).fill(false));

    var sp = new StateProcessor(sizeData, initialState);
    var res = sp.getBoardDataByIndex(7);
    var data =  Array(sizeData.boardSize)
                .fill(false)
                .map(() => Array(sizeData.boardSize).fill(false));

    var expected =  {
        data: data,
        stateRow: 30,
        stateColumn: 60
    };

    expect(res).toEqual(expected);
});

it('getBoardDataByIndex prepare data using utl ', () => {
    
    var sizeData = {
        boardSize: 30,
        length: 15,
        rowCount: 3,
        columnCount: 5
      };
    var field = Array(sizeData.rowCount * sizeData.boardSize)
                        .fill(false)
                        .map(() => Array(sizeData.boardSize * sizeData.columnCount).fill(false));

    var data =  Array(sizeData.boardSize)
                        .fill(false)
                        .map(() => Array(sizeData.boardSize).fill(true));
                        
    var initialState = utl.merge2DArrays(field, data, 31, 61);      
    data.forEach(arr => {arr[0] = false});
    data[0] = Array(sizeData.boardSize).fill(false);
    var sp = new StateProcessor(sizeData, initialState);
    var res = sp.getBoardDataByIndex(7);

    var expected = {
        data: data,
        stateRow: 30,
        stateColumn: 60
    };

    expect(res).toEqual(expected);
});

it('getBoardDataByIndex out of bounds ', () => {
    
    var sizeData = {
        boardSize: 30,
        length: 15,
        rowCount: 3,
        columnCount: 5
      };
    var initialState = Array(sizeData.rowCount * sizeData.boardSize)
                        .fill(false)
                        .map(() => Array(sizeData.boardSize * sizeData.columnCount).fill(false));

    var sp = new StateProcessor(sizeData, initialState);
    expect(() => {sp.getBoardDataByIndex(15)}).toThrow('index out of game field size');
});
