import { Article, ArticleCoAuthor} from 'schala-core';
import {  describe, expect, it } from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { shallowMount } from '@vue/test-utils';
import CompareContent from 'schala-gui/src/mainlayout/comparepage/CompareContent.vue';
//import { useDialogPluginComponent } from 'quasar';

installQuasarPlugin();
const co = new ArticleCoAuthor('','');
const arc = new Article('title','',2022, 10, 5, '', [co],'','','','',[]);
//const comp = useDialogPluginComponent();

describe('CompareContent', () =>
{
    it('mounts without errors', () =>
    {
        const wrapper = shallowMount(CompareContent, {
            props: {
                article: arc,
            },
            //emits:{
            //   useDialogPluginComponent: comp,
            //}
        });
        expect(wrapper).toBeTruthy();
    });
});

