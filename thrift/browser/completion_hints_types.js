//
// Autogenerated by Thrift Compiler (0.10.0)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//

var window = self;
TCompletionHintType = {
  'COLUMN' : 0,
  'TABLE' : 1,
  'VIEW' : 2,
  'SCHEMA' : 3,
  'CATALOG' : 4,
  'REPOSITORY' : 5,
  'FUNCTION' : 6,
  'KEYWORD' : 7
};
TCompletionHint = function(args) {
  this.type = null;
  this.hints = null;
  this.replaced = null;
  if (args) {
    if (args.type !== undefined && args.type !== null) {
      this.type = args.type;
    }
    if (args.hints !== undefined && args.hints !== null) {
      this.hints = Thrift.copyList(args.hints, [null]);
    }
    if (args.replaced !== undefined && args.replaced !== null) {
      this.replaced = args.replaced;
    }
  }
};
TCompletionHint.prototype = {};
TCompletionHint.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.I32) {
        this.type = input.readI32().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.LIST) {
        var _size0 = 0;
        var _rtmp34;
        this.hints = [];
        var _etype3 = 0;
        _rtmp34 = input.readListBegin();
        _etype3 = _rtmp34.etype;
        _size0 = _rtmp34.size;
        for (var _i5 = 0; _i5 < _size0; ++_i5)
        {
          var elem6 = null;
          elem6 = input.readString().value;
          this.hints.push(elem6);
        }
        input.readListEnd();
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.STRING) {
        this.replaced = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

TCompletionHint.prototype.write = function(output) {
  output.writeStructBegin('TCompletionHint');
  if (this.type !== null && this.type !== undefined) {
    output.writeFieldBegin('type', Thrift.Type.I32, 1);
    output.writeI32(this.type);
    output.writeFieldEnd();
  }
  if (this.hints !== null && this.hints !== undefined) {
    output.writeFieldBegin('hints', Thrift.Type.LIST, 2);
    output.writeListBegin(Thrift.Type.STRING, this.hints.length);
    for (var iter7 in this.hints)
    {
      if (this.hints.hasOwnProperty(iter7))
      {
        iter7 = this.hints[iter7];
        output.writeString(iter7);
      }
    }
    output.writeListEnd();
    output.writeFieldEnd();
  }
  if (this.replaced !== null && this.replaced !== undefined) {
    output.writeFieldBegin('replaced', Thrift.Type.STRING, 3);
    output.writeString(this.replaced);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

