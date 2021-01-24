import { setup } from 'goober'
import { h } from 'preact'
import register from 'preact-custom-element'
import { Sample } from './text'

setup(h)

register(Sample, 'preact-sample-blah', ['color'])
