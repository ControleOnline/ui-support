/* eslint-disable no-unused-vars */
import React, {useMemo} from 'react';
import {ActivityIndicator, ScrollView, View} from 'react-native';
import {Text} from 'react-native-animatable';
import {useStore} from '@store';
import {resolveThemePalette} from '@controleonline/../../src/styles/branding';
import {colors} from '@controleonline/../../src/styles/colors';
import AppMenuGrid from '@controleonline/ui-layout/src/react/components/AppMenuGrid';
import styles from './index.styles';

export default function ServiceHomePage({navigation}) {
  const themeStore = useStore('theme');
  const peopleStore = useStore('people');

  const {colors: themeColors, menus} = themeStore.getters;
  const {currentCompany} = peopleStore.getters;

  const brandColors = useMemo(
    () =>
      resolveThemePalette(
        { ...themeColors, ...(currentCompany?.theme?.colors || {}) },
        colors,
      ),
    [themeColors, currentCompany?.id],
  );
  const primaryColor = brandColors.primary || '#2563EB';

  if (!currentCompany || !themeColors) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color={primaryColor} size="large" />
      </View>
    );
  }

  return (
    <View style={[styles.container, {backgroundColor: brandColors.background || '#F8FAFC'}]}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Operacional</Text>
        </View>

        <AppMenuGrid
          emptyMessage="Nenhum menu operacional configurado."
          menus={menus}
          navigation={navigation}
        />
      </ScrollView>
    </View>
  );
}
