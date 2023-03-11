import {
  render,
  screen,
  waitFor,
  fireEvent,
} from '@testing-library/react-native';
import {server, rest} from '../mocks/server';
import App from '../App';

describe('App', () => {
  beforeEach(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.123456789);
  });

  //After each test, reset the mock of Math.random so it goes back to it's normal
  //functioning
  afterEach(() => {
    jest.spyOn(global.Math, 'random').mockRestore();
  });

  it('renders correctly', async () => {
    render(<App />);
    //Wait for the correct text to show on screen
    await waitFor(() =>
      expect(screen.getByText('Fact is: Fact for 1')).toBeVisible(),
    );
  });

  it('gets a new number and fact after clicking button', async () => {
    render(<App />);
    //Wait for the correct text to show on screen
    //Click the button to generate a new random number
    await waitFor(() =>
      expect(screen.getByText('Generate random number')).toBeVisible(),
    );
    fireEvent.press(screen.getByText('Generate random number'));
    await waitFor(() =>
      expect(screen.getByText('Fact is: Fact for 1234')).toBeVisible(),
    );
  });

  it('Shows error message on network error', async () => {
    server.use(
      rest.get('https://api.math.tools/numbers/fact', async (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({message: 'testErrorMessage'}));
      }),
    );
    render(<App />);
    await waitFor(() =>
      expect(screen.getByText(`Fact is: Error getting fact`)).toBeVisible(),
    );
  });
});
