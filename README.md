# @vaalentin/gl-program

WebGL program wrapper.

## Installation

```
$ npm install --save @vaalentin/gl-program
```

## Usage

```js
import Program from '@vaalentin/gl-program';

// setup canvas, gl and buffers

const program = new Program(gl,
  `
  attribute vec3 aPos;

  void main() {
    gl_Position = vec4(aPos, 1.0);
  }
  `,
  `
  uniform vec3 uCol;

  void main() {
    gl_FragColor = vec4(uCol, 1.0);
  }
  `
);

program.addAttribute('aPos', 3, gl.FLOAT);
program.addUniform('uCol', gl.FLOAT_VEC3);

vertsBuffer.bind();
program.setAttributePointer('aPos');

program.setUniform('uCol', [1, 0, 0]);
```

## API

#### `program = new Program(gl, vert, frag)`

Create a new program, where:
- `gl` is the [WebGL context](https://github.com/vaalentin/gl-context).
- `vert` is the vertex shader. It can either be a [`Shader`](https://github.com/vaalentin/gl-shader) instance or a `string`.
- `frag` is the fragment shader. It can either be a [`Shader`](https://github.com/vaalentin/gl-shader) instance or a `string`.

#### `program.addAttribute(name, size, type)`

Add a new attribute to the program. Size is usually `2` (vec2) or `3` (vec3), and type `gl.FLOAT`.

#### `program.setAttributePointer(name)`

Set the attribut pointer to the current active buffer.

#### `program.addUniform(name, type)`

Add a new uniform where the type can be:
- `gl.INT`
- `gl.INT_VEC2`
- `gl.INT_VEC3`
- `gl.INT_VEC4`
- `gl.FLOAT`
- `gl.FLOAT_VEC2`
- `gl.FLOAT_VEC3`
- `gl.FLOAT_VEC4`
- `gl.FLOAT_MAT2`
- `gl.FLOAT_MAT3`
- `gl.FLOAT_MAT4`

#### `program.setUniform(name, value)`

Set uniform value.

#### `program.bind()`

Make this program the active one. Calls `gl.useProgram()`.

#### `program.dispose()`

Delete instance. Calls `gl.deleteProgram()`.

## License

MIT, see [LICENSE.md](https://github.com/vaalentin/gl-program/blob/master/LICENSE.md) for more details.

## Credits

Thanks to the amazing [stackgl](http://stack.gl/) for the inspiration.
