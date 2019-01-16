
const isDone: boolean = false;

const decLiteral: number = 6;
const hexLiteral: number = 0xf00d;
const binaryLiteral: number = 0b1010;
const octalLiteral: number = 0o744;

const newName: string = "bob";

const list: string[] = ['fuchao', 'meng']

// Tuple 解决数组中多个类型的情况，属于联合类型
let tuple: [string, number];

enum Color { Red, Green, Blue }
const color: Color = Color.Green;

const someValue: any = "this is a string";
const stringLen: number = (<string>someValue).length;