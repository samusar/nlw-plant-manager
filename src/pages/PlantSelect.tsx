import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { 
  SafeAreaView, 
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { EnviromentButton } from '../components/EnviromentButton';
import { Header } from '../components/Header';
import { Load } from '../components/Load';
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import { api } from '../services/api';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface Environment {
  key: string;
  title: string;
}

interface Plant {
  id: number;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: string[];
  frequency: {
    times: number;
    repeat_every: string;
  }
}

export function PlantSelect(){
  const [ environments, setEnvironments ] = useState<Environment[]>([]);
  const [ plants, setPlants ] = useState<Plant[]>([]);
  const [ keyEnvironmentSelected, setKeyEnvironmentSelected ] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadedAll, setLoadedAll] = useState(false);

  function fetchPlants() {
    if(loadedAll) {
      return;
    }

    api
    .get(`/plants?_sort=name&_order=asc&_page=${page}&_limit=8`)
    .then(response => {
      const { data } = response;

      if(!data) {
        return setLoadedAll(true);
      }
      
      if(page > 1) {
        return setPlants(oldValues => [...oldValues, ...data])
      }

      setPlants(data);
    }).finally(() => {
      setLoadingMore(false);
      setLoading(false);
    });
  };

  const handleEnvironmentChange = useCallback((keySelected: string) => {
    setKeyEnvironmentSelected(keySelected);
  }, []);

  const handleFetchMore = useCallback((distance: number) => {
    if (distance < 1 || loadedAll) {
      return;
    }

    setLoadingMore(true);

    setPage(oldValue => oldValue + 1);
    console.log('distance', distance);
  }, []);

  useEffect(() => {
    api
      .get('/plants_environments?_sort=title&_order=asc')
      .then(response => {
        const { data } = response;
        setEnvironments([
          {
            key: 'all',
            title: 'Todos',
          },
          ...data,
        ]);
      });
  }, []);

  useEffect(() => {
    fetchPlants();
  },[page]);

  const filteredPlants = useMemo(() => {
    if (keyEnvironmentSelected === 'all') {
      return plants;
    } 

    return plants.filter(plant => plant.environments.includes(keyEnvironmentSelected));
    
  }, [keyEnvironmentSelected, plants]);

  if (loading) {
    return <Load />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Header />

        <Text style={styles.textTitle}>
          Em qual ambiente
        </Text>
        <Text style={styles.textSubtitle}>
          você quer colocar sua planta?
        </Text>
      </View>

      <View>
        <FlatList
          data={environments}
          keyExtractor={item => item.key}
          renderItem={({ item }) => (
            <EnviromentButton 
              title={item.title}
              active={item.key === keyEnvironmentSelected}
              onPress={() => handleEnvironmentChange(item.key)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.enviromentsList}
        />
      </View>

      <View style={styles.plants}>
        <FlatList
          data={filteredPlants}
          keyExtractor={item => String(item.id)}
          renderItem={({item}) => (
            <PlantCardPrimary data={item} />
          )}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) => {
            handleFetchMore(distanceFromEnd);
          }}
          ListFooterComponent={
            loadingMore ? (
              <ActivityIndicator color={colors.green} />
            ) : (
              <></>
            )
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 30,    
  },
  textTitle: {
    fontSize: 17,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 20,
    marginTop: 15,
  },
  textSubtitle: {
    fontSize: 17,
    color: colors.heading,
    fontFamily: fonts.text,
    lineHeight: 20,
  },
  enviromentsList: {
    height: 40,
    justifyContent: 'center',
    paddingBottom: 5,
    marginLeft: 40,
    paddingRight: 50,
    marginVertical: 32
  }, 
  plants: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center',
  },
});