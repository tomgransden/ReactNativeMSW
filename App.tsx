/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';

//API call that takes a number and returns you a fact
export const getNumberFactFromAPI = (num: number) => {
  return fetch(`https://api.math.tools/numbers/fact?number=${num}`, {
    headers: {
      'X-MathTools-Api-Secret': 'NSoZ2IiPQBxk74_ImjecUweF',
    },
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.resolve({contents: {fact: `Error getting fact`}});
    })
    .then(json => json?.contents?.fact as string)
    .catch(() => {
      return `Error getting fact`;
    });
};

function App(): JSX.Element {
  const [fact, setFact] = useState<string | undefined>();
  const [num, setNumber] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getNumberFactFromAPI(num).then(factFromApi => {
      setFact(factFromApi);
      setLoading(false);
    });
  }, [num]);

  if (loading) return <ActivityIndicator style={{flex: 1}} size={'large'} />;
  return (
    <SafeAreaView style={styles.container}>
      {fact ? <Text>Fact is: {fact}</Text> : <Text>No fact loaded</Text>}
      <Text>Number is {num}</Text>
      <Pressable onPress={() => setNumber(Math.floor(Math.random() * 10000))}>
        <Text>Generate random number</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
