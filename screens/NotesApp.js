import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addNote, selectNotes, deleteNote} from '../store/notesSlice'; // Import deleteNote action

const NotesApp = () => {
  const [noteText, setNoteText] = useState('');
  const dispatch = useDispatch();
  const notes = useSelector(selectNotes);

  const handleSaveNote = () => {
    if (noteText.trim()) {
      dispatch(addNote({id: Math.random(), content: noteText}));
      setNoteText('');
    }
  };

  return (
    <View style={{flex: 1, padding: 20}}>
      <TextInput
        style={{
          marginBottom: 10,
          borderBottomWidth: 1,
          paddingBottom: 5,
          color: 'black',
        }}
        placeholder="Enter your note here"
        value={noteText}
        onChangeText={text => setNoteText(text)}
      />
      <Button title="Save" onPress={handleSaveNote} />
      <FlatList
        data={notes}
        renderItem={({item}) => (
          <View style={styles.itemContainer}>
            <Text style={styles.item}>{item.content}</Text>
            <Button
              title="Delete"
              onPress={() => dispatch(deleteNote(item.id))} // Dispatch deleteNote action
              color="red"
            />
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  item: {
    flex: 1,
    color: 'black',
  },
});

export default NotesApp;
