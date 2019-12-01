import React from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet, ActivityIndicator, TouchableOpacity,
} from 'react-native';

class Users extends React.Component {

    constructor(props) {
        super(props);
        this.state =
            {
                isLoading: true,
                videos: [],
                fetching_Status: false,
            };
        this.page = 0;
    }


    fetch_more_data_from_server = () => {
        this.page = this.page + 1;
        this.setState({fetching_Status: true}, () => {
            fetch('http://164.132.226.137:9999/youtuber/feeds/searchByCommunityName?name=f&page=48')
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        videos: [...this.state.videos, ...responseJson.content],
                        fetching_Status: false,
                    });
                })
                .catch((error) => {
                    console.error(error);
                });

        });
    };

    FlatListItemSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: '100%',
                    backgroundColor: '#607D8B',
                }}
            />
        );
    };

    componentDidMount() {
        this.page = this.page + 1;
        fetch('http://164.132.226.137:9999/youtuber/feeds/searchByCommunityName?name=f&page=48')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({videos: [...this.state.videos, ...responseJson.content], isLoading: false});
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        console.log(this.state.videos);
        return (
            <View style={styles.MainContainer}>
                {
                    (this.state.isLoading)
                        ?
                        (<ActivityIndicator size="large"/>)
                        :
                        (
                            <FlatList
                                style={{width: '100%'}}
                                keyExtractor={(item, index) => index}
                                data={this.state.videos}
                                ItemSeparatorComponent={this.FlatListItemSeparator}
                                renderItem={({item, index}) => <Text
                                    style={styles.flatList_items}> {item.title} </Text>}
                                onEndReached={this.fetch_more_data_from_server}
                                onEndReachedThreshold={0.5}
                            />
                        )
                }
            </View>
        );
    }

}

const styles = StyleSheet.create(
    {
        MainContainer:
            {
                flex: 1,
                justifyContent: 'center',
                margin: 5,
                paddingTop: (Platform.OS === 'ios') ? 20 : 0,
            },

        footerStyle:
            {
                padding: 7,
                alignItems: 'center',
                justifyContent: 'center',
                borderTopWidth: 2,
                borderTopColor: '#009688',
            },

        TouchableOpacity_style:
            {
                padding: 7,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#F44336',
                borderRadius: 5,
            },

        TouchableOpacity_Inside_Text:
            {
                textAlign: 'center',
                color: '#fff',
                fontSize: 18,
            },

        flatList_items:
            {
                fontSize: 20,
                color: '#000',
                padding: 10,
            },
    });

export default Users;
