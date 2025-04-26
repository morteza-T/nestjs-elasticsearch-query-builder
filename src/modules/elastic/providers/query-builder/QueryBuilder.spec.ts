import { Test, TestingModule } from '@nestjs/testing';
import ElasticQueryBuilder from './QueryBuilder';
import Filter from './BooleanQueries/FIlter';
import Bool from './Bool';

describe('ElasticQueryBuilder provider', () => {
    let sut: ElasticQueryBuilder;
    let filter: Filter
    let bool: Bool
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ElasticQueryBuilder,

            ],
        }).compile();

        sut = await module.resolve<ElasticQueryBuilder>(ElasticQueryBuilder);
        bool = sut.bool()

    });

    it('should be defined', () => {
        expect(sut).toBeDefined();
    });
    describe('add conditions (Leaf Queries) with filter query', () => {
        beforeAll(() => {
            filter = bool.filter()
        })

        it('term condition should be added to filter', () => {

            const termKey = 'testKey'
            const termValue = 'testValue'
            const expectedResult = { term: { [termKey]: termValue } }

            filter.term(termKey, termValue)

            expect(filter.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining(expectedResult)
                ])
            )

        })

        it('terms condition should be added to filter', () => {

            const termsKey = 'testKey'
            const termsValue = ['testValue', 'testValue2']
            const expectedTerms = { terms: { [termsKey]: termsValue } }
            filter.terms(termsKey, termsValue)

            expect(filter.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining(expectedTerms)
                ])
            )

        })

        it('match condition should be added to filter', () => {

            const matchKey = 'testKey'
            const matchValue = 'testValue'
            const expectedResult = { match: { [matchKey]: matchValue } }
            filter.match(matchKey, matchValue)

            expect(filter.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining(expectedResult)
                ])
            )

        })
        it('match_phrase condition should be added to filter', () => {

            const matchPhraseKey = 'testKey'
            const matchPhraseValue = 'testValue'
            const expectedResult = { match_phrase: { [matchPhraseKey]: matchPhraseValue } }
            filter.match_phrase(matchPhraseKey, matchPhraseValue)

            expect(filter.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining(expectedResult)
                ])
            )

        })

        it('exists condition should be added to filter', () => {

            const existsValue = 'testValue'
            const expectedResult = { exists: { field: existsValue } }

            filter.exists(existsValue)

            expect(filter.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining(expectedResult)
                ])
            )

        })
    })
});
