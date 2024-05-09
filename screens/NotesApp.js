import React, {useState, useMemo, useCallback} from 'react';
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addNote, selectNotes, deleteNote} from '../store/notesSlice';

const NotesApp = () => {
  const [noteText, setNoteText] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false); // State to toggle note input
  const dispatch = useDispatch();
  const notes = useSelector(selectNotes);

  const handleSaveNote = useCallback(() => {
    if (noteText.trim()) {
      dispatch(addNote({id: Math.random(), content: noteText}));
      setNoteText('');
      setIsAddingNote(false); // Hide note input after saving
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
          <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      );
    },
    [dispatch],
  );

  const memoizedNotes = useMemo(() => notes, [notes]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter your note here"
        value={noteText}
        onChangeText={text => setNoteText(text)}
        onFocus={() => setIsAddingNote(true)} // Show note input when focused
      />
      {isAddingNote && ( // Show note input only when isAddingNote is true
        <View style={styles.noteInputContainer}>
          <Button title="Save" onPress={handleSaveNote} />
          <TextInput
            style={styles.noteInput}
            multiline
            placeholder="Write your note here..."
            value={noteText}
            onChangeText={text => setNoteText(text)}
          />
        </View>
      )}
      <FlatList
        data={memoizedNotes}
        renderItem={memoizedRenderItem}
        keyExtractor={item => item.id.toString()}
      />
      <TouchableOpacity
        onPress={() => setIsAddingNote(true)}
        style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    marginBottom: 10,
    borderBottomWidth: 1,
    paddingBottom: 5,
    fontSize: 16,
    color: 'black',
  },
  noteInputContainer: {
    marginBottom: 10,
  },
  noteInput: {
    marginBottom: 10,
    borderBottomWidth: 1,
    paddingBottom: 5,
    fontSize: 16,
    color: 'black',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  item: {
    flex: 1,
    fontSize: 18,
    color: 'black',
  },
  deleteButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'blue',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 24,
    color: 'white',
  },
});

export default NotesApp;
