import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Keyboard,
  ScrollView,
  RefreshControl,
  Image,
  FlatList,
} from 'react-native';
import {getProducts, getCategories} from '../actions/';
import Io from 'react-native-vector-icons/Ionicons';
import MI from 'react-native-vector-icons/MaterialIcons';
import {Rating} from 'react-native-elements';
import _ from 'lodash';
const styles = StyleSheet.create({
  container: {},
  viewHeader: {
    height: Dimensions.get('screen').height * 0.1,
    width: Dimensions.get('screen').width * 1,
    // position: 'absolute',
    top: 0,
    justifyContent: 'center',
  },
  viewItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  viewLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtHeader: {
    fontFamily: 'SFUIText-Bold',
    fontSize: 20,
    color: '#000',
    letterSpacing: 0,
    marginLeft: 20,
    fontWeight: 'bold',
  },
  viewIcon: {
    padding: 5,
    borderRadius: 50,
    backgroundColor: '#fff',
  },
  imgFilter: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  viewListCategories: (data, index) => ({
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 8,
    marginLeft: 15,
    marginRight: data.length === index + 1 ? 15 : 0,
    borderRadius: 5,
  }),
  txtListCategories: {
    fontFamily: 'SFUIText-Bold',
    fontSize: 12,

    color: '#000',
    textAlign: 'center',
    letterSpacing: 0,
    fontWeight: 'bold',
  },
  viewList: {marginTop: 15},
  viewListParent: {marginTop: 20},
  viewCardList: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: '95%',
    alignItems: 'center',
    marginVertical: 5,

    // marginHorizontal: '10%',
  },
  viewListItem: i => ({
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: '45%',
    height: '100%',
    marginRight: i % 2 == 0 ? 5 : 0,
    marginLeft: i % 2 == 1 ? 5 : 0,
  }),
  txtListItem: {
    fontFamily: 'SFUIText',
    fontSize: 12,
    color: '#000',
    letterSpacing: 0,
    textAlign: 'left',
    marginVertical: 3,
  },
  txtListItemPrice: {
    fontFamily: 'SFUIText-Bold',
    fontSize: 14,
    color: '#000',
    letterSpacing: 0,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  imgListItem: {
    width: 100,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  viewDescItem: {
    paddingTop: 8,
    paddingBottom: 5,
    paddingHorizontal: 5,
  },
  txtOffDiscount: {
    fontFamily: 'SFUIText',
    fontSize: 9,
    color: '#2596be',
    letterSpacing: 0,
    textAlign: 'right',
  },
  viewPriceItem: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewHeaderLeft: item => ({
    paddingHorizontal: 5,
    borderRadius: 3,
    marginTop: 8,
    backgroundColor: item.out_of_stock ? 'red' : '#fff',
  }),
  txtHeaderLeft: item => ({
    fontFamily: 'SFUIText-Bold',
    color: item.out_of_stock ? '#fff' : '#000',
    fontSize: 10,
    fontWeight: 'bold',
  }),
  viewHeaderParentList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewFav: {borderRadius: 25, padding: 8},
  viewLoading: {
    width: Dimensions.get('screen').width * 1,
    height: Dimensions.get('screen').height * 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
const Main = props => {
  const {navigation} = props;
  const dispatch = useDispatch();

  const dataCategories = useSelector(store => store.data?.categories);
  const dataProducts = useSelector(store => store.data?.products);
  const [data, setData] = useState(false);
  useEffect(() => {
    dispatch(getProducts(dispatch));
    dispatch(getCategories(dispatch));
  }, []);
  useEffect(() => {
    if (!_.isEmpty(dataProducts)) {
      setData(dataProducts);
    }
  });
  const renderHeader = ({item, index}) => {
    return (
      <View style={styles.viewListCategories(dataCategories, index)}>
        <Text style={styles.txtListCategories}>{item.name}</Text>
      </View>
    );
  };
  const handleTxtHeader = item => {
    if (item.out_of_stock) return 'Out of stock';
    else if (item.new) return 'New';
    else return '';
  };
  const renderList = ({item, index}) => {
    const _data = [...dataProducts];
    return (
      <View style={styles.viewListItem(index)}>
        <View style={styles.viewHeaderParentList}>
          <View style={styles.viewHeaderLeft(item)}>
            <Text style={styles.txtHeaderLeft(item)}>
              {handleTxtHeader(item)}
            </Text>
          </View>
          <View style={styles.viewFav}>
            <MI
              name={item.isFav ? 'favorite' : 'favorite-outline'}
              size={15}
              color={'#000'}
            />
          </View>
        </View>

        <View>
          <Image
            onError={e => {
              _data[index].image =
                'https://www.bevi.com/static/files/0/ecommerce-default-product.png';
              setData(_data);
            }}
            source={{
              uri: data[index].image,
            }}
            style={styles.imgListItem}
          />
        </View>
        <View style={styles.viewDescItem}>
          <Rating
            imageSize={10}
            readonly
            style={{alignSelf: 'flex-start'}}
            startingValue={item.rating}
            // style={{ styles.rating }}
          />
          <Text style={styles.txtListItem}>{item.name}</Text>
          <View style={styles.viewPriceItem}>
            <Text style={styles.txtListItemPrice}>{item.price}</Text>
            {item.off ? (
              <Text style={styles.txtOffDiscount}>{item.off}</Text>
            ) : null}
          </View>
        </View>
      </View>
    );
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.viewHeader}>
        <View style={styles.viewItemHeader}>
          <View style={styles.viewLeft}>
            <View style={styles.viewIcon}>
              <Io name="ios-arrow-back" size={20} color={'#000'} />
            </View>

            <Text style={styles.txtHeader}>Shoes</Text>
          </View>
          <View>
            <View style={styles.viewIcon}>
              <Image
                source={{
                  uri: 'https://cdn3.iconfinder.com/data/icons/minimalisticons/28/burger-menu-1-1-512.png',
                }}
                style={styles.imgFilter}
              />
            </View>
          </View>
        </View>
      </View>

      {_.isEmpty(dataProducts) || _.isEmpty(dataCategories) ? (
        <View style={styles.viewLoading}>
          <ActivityIndicator size={'large'} color={'#000'} />
        </View>
      ) : (
        <View>
          <View>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={dataCategories}
              style={styles.viewList}
              renderItem={renderHeader}
            />
          </View>
          <View>
            <FlatList
              showsVerticalScrollIndicator={false}
              numColumns={2}
              data={data}
              columnWrapperStyle={styles.viewCardList}
              style={styles.viewListParent}
              renderItem={renderList}
            />
          </View>
        </View>
      )}
    </ScrollView>
  );
};
export default Main;
