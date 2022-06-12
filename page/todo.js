import React, {useState} from 'react';
import type {Node} from 'react';
import {View, Text, TextInput, TouchableOpacity, FlatList} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';

const Todo = () => {
  const [task, setTask] = useState('');
  const [taskItems, setTaskItems] = useState([
    {
      id: 1,
      title: 'First Task',
      status: false,
    },
    {
      id: 2,
      title: 'Second Task',
      status: false,
    },
  ]);
  const [selectedItems, setSelectedItems] = useState([]);

  const onAddTask = async t => {
    var index =
      taskItems.length === 0 ? 0 : Math.max(...taskItems.map(n => n.id)) + 1;
    await setTaskItems([...taskItems, {id: index, title: t, status: false}]);
    setTask('');
  };

  const onDeleteTask = t => {
    if (selectedItems.includes(t.id)) {
      setSelectedItems(selectedItems.filter(n => n.id !== t.id));
    }
    setTaskItems(taskItems.filter(n => n.id !== t.id));
  };

  const onManyDeleteTask = () => {
    setTaskItems([...taskItems.filter(n => !selectedItems.includes(n.id))]);
    setSelectedItems([]);
  };

  const onSelectTask = t => {
    if (selectedItems.includes(t.id)) {
      setSelectedItems([...selectedItems.filter(n => n !== t.id)]);
    } else {
      selectedItems.push(t.id);
      setSelectedItems([...selectedItems]);
    }
  };

  const onStatusChange = t => {
    const index = taskItems.findIndex(n => n.id === t.id);
    taskItems[index].status = !t.status;
    setTaskItems([...taskItems]);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#646464',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          width: '80%',
          flex: 1,
          marginVertical: 30,
          alignItems: 'center',
        }}>
        <View
          style={{
            height: 60,
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 10,
          }}>
          <Text style={{fontSize: 30, fontWeight: 'bold', color: '#ffffff'}}>
            To Do List
          </Text>
          {selectedItems.length === 0 ? null : (
            <TouchableOpacity onPress={() => onManyDeleteTask()}>
              <Feather name="trash-2" size={30} color="#ffffff" />
            </TouchableOpacity>
          )}
        </View>
        <FlatList
          style={{width: '100%', flex: 1}}
          data={taskItems}
          renderItem={({item}) => (
            <View
              key={item.id}
              style={{
                height: 55,
                width: '100%',
                alignItems: 'center',
                flexDirection: 'row',
                backgroundColor: selectedItems.includes(item.id)
                  ? '#00ff00'
                  : '#ffffff',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
                borderRadius: 10,
                marginBottom: 15,
                paddingHorizontal: 5,
              }}>
              <TouchableOpacity
                style={{
                  height: 50,
                  width: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => onStatusChange(item)}>
                <Feather
                  name={item.status ? 'check-square' : 'square'}
                  size={30}
                  color={item.status ? 'green' : 'red'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{height: '100%', flex: 1, justifyContent: 'center'}}
                onLongPress={() => onSelectTask(item)}
                onPress={() => {
                  selectedItems.length === 0
                    ? onDeleteTask(item)
                    : onSelectTask(item);
                }}>
                <View>
                  <Text
                    style={{fontSize: 20, paddingLeft: 10, color: '#000000'}}>
                    {item.title}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
        <View style={{flexDirection: 'row', height: 60, alignItems: 'center'}}>
          <TextInput
            value={task}
            onChangeText={setTask}
            style={{
              height: 50,
              flex: 1,
              backgroundColor: 'white',
              borderWidth: 1,
              borderColor: 'black',
              borderRadius: 20,
              paddingHorizontal: 10,
            }}
            placeholder="Write a new task"
          />
          {task === '' ? (
            <TouchableOpacity
              style={{
                width: 60,
                height: 60,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Feather name="x-octagon" size={30} color="#ffffff" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => onAddTask(task)}
              style={{
                width: 60,
                height: 60,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Entypo name="add-to-list" size={30} color="#ffffff" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default Todo;
