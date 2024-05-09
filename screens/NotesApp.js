import React, {useState, useMemo, useCallback} from 'react';
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addNote, selectNotes, deleteNote} from '../store/notesSlice';

const NotesApp = () => {
  const [noteText, setNoteText] = useState('');
  const dispatch = useDispatch();
  const notes = useSelector(selectNotes);

  const handleSaveNote = useCallback(() => {
    if (noteText.trim()) {
      dispatch(addNote({id: Math.random(), content: noteText}));
      setNoteText('');
    }
  }, [dispatch, noteText]);

  const memoizedRenderItem = useCallback(
    ({item}) => {
      const handleDelete = () => {
        dispatch(deleteNote(item.id));
      };

      return (
        <View style={styles.itemContainer}>
          <Text style={styles.item}>{item.content}</Text>
          <Button title="Delete" onPress={handleDelete} color="red" />
        </View>
      );
    },
    [dispatch],
  );

  const memoizedNotes = useMemo(() => notes, [notes]);

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
        data={memoizedNotes}
        renderItem={memoizedRenderItem}
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
