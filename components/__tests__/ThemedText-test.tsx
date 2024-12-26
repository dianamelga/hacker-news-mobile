import * as React from 'react';
import renderer from 'react-test-renderer';
import { ThemedText } from '@/components/themed-text.component';

it(`renders correctly`, () => {
  const tree = renderer
    .create(<ThemedText>Snapshot test!</ThemedText>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
