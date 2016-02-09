import test from 'tape';
import getGl from '@vaalentin/gl-context';
import Shader from '@vaalentin/gl-shader';
import Program from '../src';

const canvas = document.createElement('canvas');
const gl = getGl(canvas);

const vertexSrc = `
  attribute vec3 aPosition;

  void main() {
    gl_Position = vec4(aPosition, 1.0);
  }
`;

const fragmentSrc = `
  precision mediump float;

  uniform vec4 uColor;

  void main() {
    gl_FragColor = uColor;
  }
`;

test('should be instanciable', t => {
  t.plan(1);

  const program = new Program(gl, vertexSrc, fragmentSrc);

  t.ok(program instanceof Program, 'instance of Program');
});

test('should accept string or Shader', t => {
  t.plan(1);

  const programA = new Program(gl, vertexSrc, fragmentSrc);
  const programB = new Program(gl,
    new Shader(gl, gl.VERTEX_SHADER, vertexSrc),
    new Shader(gl, gl.FRAGMENT_SHADER, fragmentSrc)
  );

  t.pass('programs successfully created');
});

test('should set active program when binded', t => {
  t.plan(1);

  const program = new Program(gl, vertexSrc, fragmentSrc);
  program.bind();

  t.equal(gl.getParameter(gl.CURRENT_PROGRAM), program.program, 'program is acive');
});

test('should accept attributes', t => {
  t.plan(1);

  const program = new Program(gl, vertexSrc, fragmentSrc);
  program.addAttribute('aPosition', 3, gl.FLOAT);

  const attibutesCount = gl.getProgramParameter(program.program, gl.ACTIVE_ATTRIBUTES);

  t.equal(attibutesCount, 1, '1 active attribute');
});

test('should accept uniforms', t => {
  t.plan(1);

  const program = new Program(gl, vertexSrc, fragmentSrc);
  program.addUniform('uColor', gl.FLOAT_VEC4);

  const uniformsCount = gl.getProgramParameter(program.program, gl.ACTIVE_UNIFORMS);

  t.equal(uniformsCount, 1, '1 active uniform');
});

test('should be disposable', t => {
  t.plan(1);

  const program = new Program(gl, vertexSrc, fragmentSrc);
  program.dispose();
  
  t.equal(program.program, null, 'program deleted');
});

test.onFinish(window.close.bind(window));
