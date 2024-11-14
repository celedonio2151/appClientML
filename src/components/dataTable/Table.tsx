import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';

export default function Table({data, columns, onEdit}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    // Apply search filter
    const filtered = data.filter(item => {
      return Object.values(item).some(value =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
      );
    });

    // Apply sorting
    if (sortedColumn) {
      filtered.sort((a, b) => {
        const aValue = a[sortedColumn];
        const bValue = b[sortedColumn];
        if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }

    // Apply pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = filtered.slice(startIndex, endIndex);

    setFilteredData(paginatedData);
  }, [data, searchTerm, sortedColumn, sortOrder, currentPage, itemsPerPage]);

  const handleSort = column => {
    if (column === sortedColumn) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortedColumn(column);
      setSortOrder('asc');
    }
  };

  const handleEdit = item => {
    if (onEdit) {
      onEdit(item);
    }
  };

  return (
    <View>
      {/* Search */}
      <TextInput
        mode="outlined"
        label="Buscar"
        style={styles.input}
        outlineStyle={styles.inputOutline}
        placeholder="Buscar usuario..."
        onChangeText={setSearchTerm}
        value={searchTerm}
        left={<TextInput.Icon icon="account-search" />}
      />
      {/* Table */}
      <View style={styles.table}>
        {/* Header */}
        <View style={styles.row}>
          {columns.map(column => (
            <TouchableOpacity
              key={column.key}
              onPress={() => handleSort(column.key)}
              style={styles.cell}>
              <Text style={styles.label}>{column.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {/* Data */}
        {filteredData.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleEdit(item)}
            style={styles.row}>
            {columns.map(column => (
              <Text key={column.key} style={styles.cell}>
                {item[column.key]}
              </Text>
            ))}
          </TouchableOpacity>
        ))}
      </View>
      {/* Pagination */}
      <View style={styles.pagination}>
        <TouchableOpacity
          onPress={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}>
          <Text>Previous</Text>
        </TouchableOpacity>
        <Text>Page {currentPage}</Text>
        <TouchableOpacity onPress={() => setCurrentPage(currentPage + 1)}>
          <Text>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  table: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    // backgroundColor: 'gray',
  },
  input: {
    // height: 40,
    // borderColor: 'gray',
    // borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  inputOutline: {
    borderRadius: 50,
    borderColor: 'green',
    borderWidth: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  label: {
    color: 'black',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    color: 'black',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    color: 'black',
  },
});
