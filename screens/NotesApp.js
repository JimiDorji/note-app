import React, {useState, useMemo, useCallback} from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addNote, selectNotes, deleteNote} from '../store/notesSlice';

const NotesApp = () => {
  const [noteText, setNoteText] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);
  const dispatch = useDispatch();
  const notes = useSelector(selectNotes);

  const handleSaveNote = useCallback(() => {
    if (noteText.trim()) {
      dispatch(addNote({id: Math.random(), content: noteText}));
      setNoteText('');
      setIsAddingNote(false);
    }
  }, [dispatch, noteText]);

  const handleCancelNote = useCallback(() => {
    setNoteText('');
    setIsAddingNote(false);
  }, []);

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
      {isAddingNote && (
        <View style={styles.noteInputContainer}>
          <TextInput
            style={styles.noteInput}
            multiline
            placeholder="Write your note here..."
            placeholderTextColor="black"
            value={noteText}
            onChangeText={text => setNoteText(text)}
          />
          <TouchableOpacity onPress={handleSaveNote} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleCancelNote}
            style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
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
    backgroundColor: Platform.OS === 'ios' ? '#f0f0f0' : '#fff', // iOS background color
  },
  noteInputContainer: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  noteInput: {
    flex: 1,
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
  saveButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'green',
    borderRadius: 5,
    marginRight: 10,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'gray',
    borderRadius: 5,
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NotesApp;
